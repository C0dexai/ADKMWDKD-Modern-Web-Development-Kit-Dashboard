
import React, { useState, useRef, useEffect } from 'react';
import { SimLog } from '../../types.ts';
import { generateAgentResponse, executeCode, generateFinalAnswerStream } from '../../services/geminiService.ts';
import CodeBlock from '../CodeBlock.tsx';

interface Suggestion {
    key: string;
    prompt: string;
}

const suggestionTree: Suggestion[] = [
    {
        key: 'calculate',
        prompt: "What is the square root of 15?",
    },
    {
        key: 'python_sort',
        prompt: "Use python to sort this list: [8, 4, 1, 9, 5]",
    },
    {
        key: 'architecture',
        prompt: "Explain the ADK architecture in simple terms.",
    },
    {
        key: 'custom_tool',
        prompt: "How do I create a custom tool with a schema?",
    }
];

interface PlaygroundProps {
    systemInstruction: string;
}

const Playground: React.FC<PlaygroundProps> = ({ systemInstruction }) => {
    const [logs, setLogs] = useState<SimLog[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentSuggestions, setCurrentSuggestions] = useState<Suggestion[]>(suggestionTree);
    const logsEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [logs]);

    const handleSend = async (suggestionKey?: string) => {
        let messageText = '';
        if (suggestionKey) {
            messageText = suggestionTree.find(s => s.key === suggestionKey)?.prompt || '';
        } else {
            messageText = input;
        }

        if (!messageText.trim() || isLoading) return;

        const newUserLog: SimLog = { id: Date.now(), type: 'user', text: messageText };
        setLogs(prev => [...prev, newUserLog]);
        setCurrentSuggestions(suggestionTree);
        setInput('');
        setIsLoading(true);

        try {
            const initialResponse = await generateAgentResponse(messageText, systemInstruction);
            const functionCall = initialResponse.candidates?.[0]?.content?.parts?.find(part => part.functionCall)?.functionCall;

            if (functionCall && functionCall.name === 'code_interpreter' && functionCall.args?.code) {
                const code = functionCall.args.code as string;

                const thoughtLog: SimLog = { id: Date.now() + 1, type: 'thought', text: "The user's request requires running code. I will use the Code Interpreter tool." };
                const toolCallLog: SimLog = { id: Date.now() + 2, type: 'tool', text: code };
                setLogs(prev => [...prev, thoughtLog, toolCallLog]);

                const toolResultText = await executeCode(code);

                const toolResultLog: SimLog = { id: Date.now() + 3, type: 'tool_result', text: toolResultText };
                setLogs(prev => [...prev, toolResultLog]);

                const historyParts = [
                    ...(initialResponse.candidates?.[0].content.parts || []),
                    { functionResponse: { name: 'code_interpreter', response: { content: toolResultText } } }
                ];

                const responseStream = await generateFinalAnswerStream(messageText, historyParts, systemInstruction);
                
                const agentLogId = Date.now() + 4;
                setLogs(prev => [...prev, { id: agentLogId, type: 'agent', text: '' }]);
                
                let fullText = '';
                for await (const chunk of responseStream) {
                    const chunkText = chunk.text;
                    if (chunkText) {
                        fullText += chunkText;
                        setLogs(prev => prev.map(log => 
                            log.id === agentLogId ? { ...log, text: fullText + '...' } : log
                        ));
                    }
                }
                setLogs(prev => prev.map(log => 
                    log.id === agentLogId ? { ...log, text: fullText } : log
                ));

            } else {
                const agentText = initialResponse.text;
                const agentLog: SimLog = { id: Date.now() + 1, type: 'agent', text: agentText };
                setLogs(prev => [...prev, agentLog]);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
            const errorLog: SimLog = { id: Date.now() + 1, type: 'error', text: errorMessage };
            setLogs(prev => [...prev, errorLog]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderLog = (log: SimLog) => {
        const baseClasses = "w-full flex mb-4";
        const bubbleClasses = "p-4 rounded-lg max-w-xl";

        switch(log.type) {
            case 'user':
                return (
                    <div className={`${baseClasses} justify-end`}>
                        <div className={`${bubbleClasses} bg-purple-600/50 text-white`}>{log.text}</div>
                    </div>
                );
            case 'agent':
                return (
                     <div className={`${baseClasses} justify-start`}>
                        <div className={`${bubbleClasses} bg-gray-700/50 text-gray-200 whitespace-pre-wrap`}>
                            {log.text}
                            {isLoading && log.text.endsWith('...') && <span className="blinking-cursor ml-1"></span>}
                        </div>
                    </div>
                );
            case 'thought':
                return (
                    <div className={`${baseClasses} justify-start`}>
                        <div className="p-4 rounded-lg max-w-xl bg-gray-800/60 border border-gray-600/80 w-full">
                           <p className="font-semibold text-gray-300 mb-2">Thinking...</p>
                           <p className="text-gray-400 italic">{log.text}</p>
                        </div>
                    </div>
                );
            case 'tool':
                return (
                    <div className={`${baseClasses} justify-start`}>
                        <div className="p-4 rounded-lg max-w-xl bg-blue-950/50 border border-blue-500/30 w-full">
                            <p className="font-semibold text-blue-300 mb-2">Calling Tool: <code className="font-mono">code_interpreter</code></p>
                            <CodeBlock code={log.text} language="python" />
                        </div>
                    </div>
                );
            case 'tool_result':
                return (
                    <div className={`${baseClasses} justify-start`}>
                        <div className="p-4 rounded-lg max-w-xl bg-green-950/50 border border-green-500/30 w-full">
                            <p className="font-semibold text-green-300 mb-2">Tool Result:</p>
                            <pre className="whitespace-pre-wrap font-mono text-gray-200 bg-gray-900/50 p-2 rounded">{log.text}</pre>
                        </div>
                    </div>
                );
            case 'error':
                 return (
                     <div className={`${baseClasses} justify-start`}>
                        <div className={`${bubbleClasses} bg-red-800/50 text-red-200`}><b>Error:</b> {log.text}</div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <section id="playground" className="fade-in">
            <div className="h-[calc(100vh-8rem)] flex flex-col p-6 md:p-8 semi-transparent-card" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                    Live Playground
                </h2>
                <p className="text-gray-400 mb-4">Interact directly with a Gemini-powered agent. The agent can now use a Code Interpreter tool to perform calculations and run code.</p>
                
                <div className="flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                    {logs.length === 0 && (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            <p>Send a message or click a suggestion to start.</p>
                        </div>
                    )}
                    {logs.map(log => <div key={log.id}>{renderLog(log)}</div>)}
                    <div ref={logsEndRef} />
                </div>
                
                <div className="mt-4 pt-4 border-t border-pink-500/10">
                    <h4 className="text-sm font-semibold text-pink-200 mb-2">
                        Try these suggestions:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {currentSuggestions.map((suggestion) => (
                            <button
                                key={suggestion.key}
                                onClick={() => handleSend(suggestion.key)}
                                disabled={isLoading}
                                className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-200 rounded-full text-sm hover:bg-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {suggestion.prompt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isLoading ? "Agent is thinking..." : "Ask the agent to do something..."}
                        className="flex-1 bg-gray-900/80 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className="bg-pink-600 text-white font-bold p-3 rounded-lg hover:bg-pink-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </button>
                </div>
                 <p className="text-xs text-gray-600 mt-2">This is a live demonstration. Ensure your Gemini API key is configured correctly in the environment.</p>
            </div>
        </section>
    );
};

export default Playground;