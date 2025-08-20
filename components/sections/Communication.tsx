import React from 'react';
import CodeBlock from '../CodeBlock.tsx';

const Communication: React.FC = () => {
    return (
        <section id="communication" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{ '--glow-color': 'var(--neon-blue)' } as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{ '--glow-color': 'var(--neon-blue)' } as React.CSSProperties}>
                    Communication Layer
                </h2>
                <p className="text-lg text-gray-300">
                    Effective communication is the backbone of any multi-agent system. The ADK's communication layer is designed to be robust, scalable, and standardized, ensuring that agents, humans, and external systems can interact seamlessly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 semi-transparent-card" style={{'--glow-color': 'var(--neon-blue)'} as React.CSSProperties}>
                    <h3 className="text-2xl font-bold mb-4">The Communication Bus</h3>
                    <p className="text-gray-300 mb-4">
                        Instead of direct agent-to-agent calls, all communication flows through a central, asynchronous message bus. This decouples components, improves fault tolerance, and allows for easy monitoring and debugging of the entire system.
                    </p>
                    <ul className="list-disc list-inside text-gray-300">
                        <li><b>Scalability:</b> Handle thousands of messages per second.</li>
                        <li><b>Resilience:</b> If an agent is offline, messages can be queued.</li>
                        <li><b>Observability:</b> A single point to log and inspect all traffic.</li>
                        <li><b>Flexibility:</b> Easily swap bus technologies (e.g., Redis Pub/Sub, RabbitMQ, Kafka) as needed.</li>
                    </ul>
                </div>
                <div className="p-6 semi-transparent-card" style={{'--glow-color': 'var(--neon-blue)'} as React.CSSProperties}>
                    <h3 className="text-2xl font-bold mb-4">Standard Message Schema</h3>
                    <p className="text-gray-300 mb-4">
                        All messages on the bus adhere to a standardized JSON schema. This ensures that all components speak the same language.
                    </p>
                    <CodeBlock code={`
{
  "message_id": "uuid-1234-abcd-5678",
  "task_id": "task-abc-987",
  "timestamp": "2024-07-21T10:00:00Z",
  "source": "agent:researcher-01",
  "target": "agent:writer-01",
  "type": "tool_result",
  "payload": {
    "tool_name": "WebSearch",
    "result": "Gemini is a family of multimodal AI models..."
  }
}
                    `} language="json" />
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-6 neon-text" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>Communication Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 semi-transparent-card">
                        <h4 className="font-bold text-lg mb-2 text-purple-300">Agent-to-Agent (A2A)</h4>
                        <p className="text-gray-400">The foundation of collaboration. Agents pass tasks, results, and context to each other to complete complex workflows. For example, a \`ResearcherAgent\` passes its findings to a \`WriterAgent\`.</p>
                    </div>
                    <div className="p-6 semi-transparent-card">
                        <h4 className="font-bold text-lg mb-2 text-purple-300">Human-in-the-Loop (HITL)</h4>
                        <p className="text-gray-400">For tasks requiring human supervision or approval. An agent can flag a message for human review, pausing its workflow until it receives input via the Admin Dashboard or an integrated app like Slack.</p>
                    </div>
                    <div className="p-6 semi-transparent-card">
                        <h4 className="font-bold text-lg mb-2 text-purple-300">External Webhooks</h4>
                        <p className="text-gray-400">Agents can both call external APIs and be triggered by incoming webhooks. This allows for deep integration with third-party services like GitHub, Stripe, or any custom application.</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Communication;