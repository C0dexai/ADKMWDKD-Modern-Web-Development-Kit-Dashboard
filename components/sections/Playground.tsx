
import React, { useState, useRef, useEffect } from 'react';
import { SimLog } from '../../types.ts';
import { generateResponseStream } from '../../services/geminiService.ts';

// Data structure for suggestions and their follow-ups
interface Suggestion {
    key: string;
    prompt: string;
    followUps?: Suggestion[];
}

const suggestionTree: Suggestion[] = [
    {
        key: 'architecture',
        prompt: "Explain the ADK architecture",
        followUps: [
            { key: 'orchestration-deep', prompt: "Tell me more about the Orchestration Engine" },
            { key: 'comm-bus', prompt: "How does the Communication Bus work?" },
            { key: 'state-management', prompt: "What's the role of the State Manager?" },
        ]
    },
    {
        key: 'custom-tool',
        prompt: "How do I create a custom tool?",
        followUps: [
            { key: 'tool-schema', prompt: "Why is an input schema important for a tool?" },
            { key: 'tool-best-practice', prompt: "What are some best practices for custom tools?" },
        ]
    },
    {
        key: 'orchestration',
        prompt: "What is orchestration?",
        followUps: [
            { key: 'multi-agent', prompt: "Give an example of a multi-agent workflow" },
            { key: 'a2a-comm', prompt: "How do agents communicate during orchestration?" },
        ]
    }
];

// Helper to find a suggestion anywhere in the tree by its key
const findSuggestionByKey = (key: string, tree: Suggestion[]): Suggestion | undefined => {
    for (const suggestion of tree) {
        if (suggestion.key === key) return suggestion;
        if (suggestion.followUps) {
            const found = findSuggestionByKey(key, suggestion.followUps);
            if (found) return found;
        }
    }
    return undefined;
};

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
        let selectedSuggestion: Suggestion | undefined;

        if (suggestionKey) {
            // Find suggestion in the entire tree to handle nested keys
            selectedSuggestion = findSuggestionByKey(suggestionKey, suggestionTree);
            messageText = selectedSuggestion?.prompt || '';
        } else {
            messageText = input;
        }

        if (!messageText.trim() || isLoading) return;
        
        // Update suggestions for the next turn
        if (selectedSuggestion?.followUps) {
            setCurrentSuggestions(selectedSuggestion.followUps);
        } else {
            // Reset to top-level if user typed, or clicked a leaf node
            setCurrentSuggestions(suggestionTree);
        }

        const newUserLog: SimLog = { id: Date.now(), type: 'user', text: messageText };
        setLogs(prev => [...prev, newUserLog]);
        
        if (!suggestionKey) {
            setInput('');
        }
        
        setIsLoading(true);

        const agentLogId = Date.now() + 1;
        setLogs(prev => [...prev, { id: agentLogId, type: 'agent', text: '' }]);

        try {
            const responseStream = await generateResponseStream(messageText, systemInstruction);
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

        } catch (error) {
            console.error(error);
            let errorMessage = 'An unexpected error occurred.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
             const errorLog: SimLog = { id: agentLogId, type: 'error', text: errorMessage };
             setLogs(prev => prev.map(log => log.id === agentLogId ? errorLog : log));
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
                            {log.text.endsWith('...') && <span className="blinking-cursor ml-1"></span>}
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
                <p className="text-gray-400 mb-4">Interact directly with a Gemini-powered agent. The agent is configured with the ADK system prompt to plan and execute tasks.</p>
                
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
                        {currentSuggestions === suggestionTree ? "Try these suggestions:" : "Here are some follow-ups:"}
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
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                </div>
                 <p className="text-xs text-gray-600 mt-2">This is a live demonstration. Ensure your Gemini API key is configured correctly in the environment.</p>
            </div>
        </section>
    );
};

export default Playground;
