import React from 'react';

// --- Reusable Visual Components ---

// Component for a step in the main process flow diagram
const FlowStep = ({ title, description, color }: { title: string, description: string, color: string }) => (
    <div className="flex flex-col items-center text-center w-48">
        <div className="p-4 rounded-lg border-2" style={{ borderColor: color, boxShadow: `0 0 10px ${color}` }}>
            <h4 className="font-bold text-white">{title}</h4>
        </div>
        <p className="text-xs text-gray-400 mt-2">{description}</p>
    </div>
);

// Component for the arrow connector in the process flow
const ConnectorLine = () => (
    <div className="flex-1 flex items-center justify-center">
        <svg className="w-16 h-8 text-gray-500" viewBox="0 0 100 50">
            <path d="M0 25 H100" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M90 15 L100 25 L90 35" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    </div>
);

// Component for a node within a use-case blueprint (Agent, Tool, System)
const AgentNode = ({ label, type, glowColor }: { label: string, type: 'System' | 'Orchestrator' | 'Agent' | 'Tool', glowColor: string }) => {
    const typeStyles = {
        System: 'border-gray-500 bg-gray-800/50',
        Orchestrator: 'border-purple-400 bg-purple-900/50',
        Agent: 'border-blue-400 bg-blue-900/50',
        Tool: 'border-green-400 bg-green-900/50',
    };
    return (
        <div 
            className={`text-center p-3 rounded-lg border-2 text-white text-sm font-semibold ${typeStyles[type]}`}
            style={{ '--glow-color': glowColor, boxShadow: '0 0 8px var(--glow-color)' } as React.CSSProperties}
        >
            <p className="text-xs font-light text-gray-400">{type}</p>
            {label}
        </div>
    );
};

// Component for connecting nodes in the use-case blueprints
const NodeConnector = ({ vertical = false, isBranch = false }) => (
    <div className={`flex items-center justify-center ${vertical ? 'h-8' : 'w-12'}`}>
        <svg className={`text-gray-500 ${vertical ? 'h-full' : 'w-full'}`} viewBox="0 0 24 24">
             <path d={vertical ? "M12 0 V24" : "M0 12 H24"} stroke="currentColor" strokeWidth="2" strokeDasharray={isBranch ? "2,3" : "none"} />
            { !isBranch && <path d={vertical ? "M7 19 L12 24 L17 19" : "M19 7 L24 12 L19 17" } stroke="currentColor" strokeWidth="2" fill="none" /> }
        </svg>
    </div>
);

// --- Main Overview Component ---

const Overview: React.FC = () => {
    return (
        <section id="overview" className="fade-in space-y-8">
            {/* --- Main Process Flow --- */}
            <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-blue)'} as React.CSSProperties}>
                 <h2 className="text-3xl font-bold mb-2 neon-text text-center" style={{ '--glow-color': 'var(--neon-blue)' } as React.CSSProperties}>
                    Agent Lifecycle Process
                </h2>
                 <p className="text-gray-400 text-sm mb-8 text-center uppercase tracking-wider">From Input to Intelligent Action</p>
                <div className="flex items-center justify-center w-full flex-wrap gap-y-4">
                    <FlowStep title="INPUT" description="User Prompt, API Call, or System Trigger" color="var(--neon-pink)" />
                    <ConnectorLine />
                    <FlowStep title="ORCHESTRATOR" description="Analyzes input & creates a multi-step plan" color="var(--neon-purple)" />
                    <ConnectorLine />
                    <div className="p-4 border-2 border-dashed border-gray-600 rounded-xl flex items-center flex-wrap justify-center gap-y-4">
                        <FlowStep title="AGENT RUNTIME" description="Executes a single step of the plan" color="var(--neon-blue)" />
                        <ConnectorLine />
                        <FlowStep title="LOGICAL GATE" description="Checks for success, failure, or need for another step" color="var(--neon-green)" />
                        <div className="w-full text-center text-gray-500 text-xs mt-[-1rem]">↺ Iteration Loop</div>
                    </div>
                     <ConnectorLine />
                    <FlowStep title="OUTPUT" description="Final Result, API Response, or Action" color="var(--neon-pink)" />
                </div>
            </div>

            {/* --- Core Principles --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-6 semi-transparent-card h-full" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>
                     <h3 className="text-xl font-bold mb-3 neon-text" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>Modular & Extensible</h3>
                    <p className="text-gray-300">Build agents from reusable components. Easily add new tools, models, and communication channels to adapt to any challenge.</p>
                </div>
                <div className="p-6 semi-transparent-card h-full" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>
                    <h3 className="text-xl font-bold mb-3 neon-text" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>Powerful Orchestration</h3>
                    <p className="text-gray-300">Define complex workflows where multiple agents collaborate to solve problems, passing context and results seamlessly.</p>
                </div>
                <div className="p-6 semi-transparent-card h-full" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                     <h3 className="text-xl font-bold mb-3 neon-text" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>Full Observability</h3>
                    <p className="text-gray-300">Gain deep insights with live monitoring, detailed logging, and performance dashboards. Understand every decision your agents make.</p>
                </div>
            </div>

             {/* --- What Can You Build? --- */}
             <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-blue)'} as React.CSSProperties}>
                <h3 className="text-2xl font-bold mb-6 neon-text" style={{ '--glow-color': 'var(--neon-blue)' } as React.CSSProperties}>What Can You Build? Blueprints</h3>
                <div className="space-y-12">
                    
                    {/* Use Case 1: Customer Support */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-white">Autonomous Customer Support Swarm</h4>
                        <div className="flex items-center justify-start flex-wrap gap-2">
                             <AgentNode label="User Request" type="System" glowColor="var(--neon-pink)" />
                             <NodeConnector />
                             <AgentNode label="Triage Agent" type="Orchestrator" glowColor="var(--neon-purple)" />
                             <NodeConnector />
                             <AgentNode label="Knowledge Base" type="Tool" glowColor="var(--neon-green)" />
                             {/* Logic Branching */}
                             <div className="flex flex-col items-center">
                                <NodeConnector vertical isBranch />
                                <div className="flex items-start gap-4">
                                    {/* Branch 1 */}
                                    <div className="flex items-center">
                                        <div className="flex flex-col items-center">
                                            <div className="text-green-400 text-xs font-mono mb-1">IF Answer Found</div>
                                            <NodeConnector isBranch />
                                            <AgentNode label="Response Agent" type="Agent" glowColor="var(--neon-blue)" />
                                            <NodeConnector />
                                            <AgentNode label="Send Answer" type="System" glowColor="var(--neon-pink)" />
                                        </div>
                                    </div>
                                    {/* Branch 2 */}
                                     <div className="flex items-center">
                                        <div className="flex flex-col items-center">
                                             <div className="text-yellow-400 text-xs font-mono mb-1">IF NOT Found</div>
                                            <NodeConnector isBranch />
                                            <AgentNode label="Escalate Agent" type="Agent" glowColor="var(--neon-blue)" />
                                             <NodeConnector />
                                            <AgentNode label="Human Handoff" type="Tool" glowColor="var(--neon-green)" />
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                     {/* Use Case 2: Data Analysis */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-white">Data Analysis & Reporting Pipeline</h4>
                         <div className="flex items-center justify-start flex-wrap gap-2">
                            <AgentNode label="Scheduled Trigger" type="System" glowColor="var(--neon-pink)" />
                            <NodeConnector />
                            <AgentNode label="Reporting Orchestrator" type="Orchestrator" glowColor="var(--neon-purple)" />
                            <NodeConnector />
                            <AgentNode label="Data Fetcher Agent" type="Agent" glowColor="var(--neon-blue)" />
                            <NodeConnector />
                            <AgentNode label="SQL Database" type="Tool" glowColor="var(--neon-green)" />
                            <NodeConnector />
                            <AgentNode label="Data Processor Agent" type="Agent" glowColor="var(--neon-blue)" />
                            <NodeConnector />
                            <AgentNode label="Code Interpreter" type="Tool" glowColor="var(--neon-green)" />
                             <NodeConnector />
                            <AgentNode label="Report Generator Agent" type="Agent" glowColor="var(--neon-blue)" />
                             <NodeConnector />
                             <AgentNode label="Save PDF to Drive" type="System" glowColor="var(--neon-pink)" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Overview;
