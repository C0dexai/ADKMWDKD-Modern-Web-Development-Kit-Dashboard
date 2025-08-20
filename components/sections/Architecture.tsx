import React from 'react';

const ArchComponent = ({ title, description, className }: { title: string, description: string, className?: string }) => (
    <div className={`semi-transparent-card p-4 border-purple-500/50 ${className}`}>
        <h4 className="font-bold text-md text-purple-300 mb-1">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

const Architecture: React.FC = () => {
    return (
        <section id="architecture" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                    System Architecture
                </h2>
                <p className="text-lg text-gray-300">The ADK is built on a modular, decoupled architecture designed for scalability and flexibility. Each component has a distinct responsibility, communicating through a central bus.</p>
            </div>

            <div className="relative p-8 bg-gray-900/30 rounded-xl border border-gray-700">
                {/* The Diagram Grid */}
                <div className="grid grid-cols-3 grid-rows-3 gap-8 items-center justify-center text-center">
                    <ArchComponent title="Admin Dashboard" description="Monitor, manage, and debug agents." className="col-start-1 row-start-1" />
                    <ArchComponent title="Communication Bus" description="Central nervous system for all inter-component messaging (e.g., Redis, RabbitMQ)." className="col-start-2 row-start-1" />
                    <ArchComponent title="API Gateway" description="Exposes ADK functionality via a secure REST API." className="col-start-3 row-start-1" />

                    <ArchComponent title="Tool Hub" description="A registry of available tools agents can use." className="col-start-1 row-start-2" />
                    <ArchComponent title="Orchestration Engine" description="Defines and executes multi-agent workflows." className="col-start-2 row-start-2 !border-purple-300 !border-2" />
                    <ArchComponent title="Agent Runtime" description="The environment where individual agents execute their lifecycle." className="col-start-3 row-start-2" />
                    
                    <ArchComponent title="Vector DB / Memory" description="Provides long-term memory and context for agents." className="col-start-1 row-start-3" />
                    <ArchComponent title="State Manager" description="Tracks the state of all agents and tasks." className="col-start-2 row-start-3" />
                    <ArchComponent title="LLM Providers" description="Connectors to various language models (Gemini, OpenAI, etc.)." className="col-start-3 row-start-3" />
                </div>
                 {/* Connection lines would be complex with just CSS in a responsive grid. This is a conceptual representation. For a real product, an SVG overlay would be used. */}
                <p className="text-center mt-8 text-sm text-gray-500">
                    Arrows represent data and command flow, with the Orchestration Engine at the core, directing tasks and information between all other components via the Communication Bus.
                </p>
            </div>
            
            <div>
                 <h3 className="text-2xl font-bold mb-6 neon-text" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>Component Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ArchComponent title="Orchestration Engine" description="The conductor. It reads workflow definitions and dispatches tasks to the appropriate agents based on triggers and conditions. It's the brain of any multi-agent system." />
                    <ArchComponent title="Agent Runtime" description="The heart. This component manages the lifecycle of each agent instance, loading its configuration, providing its tools, and handling its state." />
                    <ArchComponent title="Communication Bus" description="The nervous system. A message queue that decouples all components, allowing them to communicate asynchronously without direct dependencies." />
                    <ArchComponent title="Tool Hub" description="The agent's utility belt. A pluggable system where tools (like web search or code execution) are registered and made available to agents." />
                    <ArchComponent title="State Manager" description="The system's memory. It persists the current state of tasks, agent conversations, and workflow progress, ensuring fault tolerance." />
                    <ArchComponent title="API Gateway" description="The front door. It provides a single, secure entry point for external systems and the Admin Dashboard to interact with the ADK." />
                </div>
            </div>

        </section>
    );
};

export default Architecture;