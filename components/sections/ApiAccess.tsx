import React from 'react';
import CodeBlock from '../CodeBlock.tsx';

const Endpoint = ({ method, path, description, children }: { method: 'POST'|'GET'|'DELETE', path: string, description: string, children: React.ReactNode }) => {
    const methodColors = {
        'GET': 'bg-blue-600/80 text-blue-100',
        'POST': 'bg-green-600/80 text-green-100',
        'DELETE': 'bg-red-600/80 text-red-100',
    };
    return (
        <div className="py-6 border-b border-gray-700">
            <div className="flex items-center gap-4 mb-2">
                 <span className={`px-3 py-1 rounded-md text-sm font-bold font-mono ${methodColors[method]}`}>{method}</span>
                 <span className="text-lg font-mono text-gray-300">{path}</span>
            </div>
            <p className="text-gray-400 ml-2 mb-4">{description}</p>
            {children}
        </div>
    );
}

const ApiAccess: React.FC = () => {
    return (
        <section id="api-access" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-green)'} as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{'--glow-color': 'var(--neon-green)'} as React.CSSProperties}>
                    REST API Access
                </h2>
                <p className="text-lg text-gray-300">
                    Programmatically control every aspect of the ADK using our comprehensive REST API. Automate agent creation, dispatch tasks, and integrate agent capabilities into your own applications.
                </p>
            </div>

            <div className="p-6 md:p-8 semi-transparent-card">
                <h3 className="text-xl font-bold mb-4">Authentication</h3>
                <p className="text-gray-300 mb-4">All API requests must be authenticated using a bearer token. Include your API key in the \`Authorization\` header of your requests.</p>
                <CodeBlock code={'Authorization: Bearer YOUR_ADK_API_KEY'} language="http" />
            </div>

            <div className="p-6 md:p-8 semi-transparent-card">
                <h3 className="text-xl font-bold mb-4">Core Endpoints</h3>

                <Endpoint method="POST" path="/tasks" description="Create and dispatch a new task to an agent or an orchestration workflow.">
                     <CodeBlock language="json" code={`
// REQUEST BODY
{
  "agent_id": "research-agent-01",
  "input": "What are the latest advancements in battery technology?"
}

// RESPONSE (202 ACCEPTED)
{
  "task_id": "task-abc-123",
  "status": "QUEUED",
  "created_at": "2024-07-21T10:30:00Z"
}
                     `} />
                </Endpoint>

                <Endpoint method="GET" path="/tasks/{task_id}" description="Retrieve the status and results of a specific task.">
                     <CodeBlock language="json" code={`
// RESPONSE (200 OK)
{
  "task_id": "task-abc-123",
  "status": "COMPLETED",
  "agent_id": "research-agent-01",
  "input": "What are the latest advancements in battery technology?",
  "output": "Solid-state batteries are showing promise...",
  "created_at": "2024-07-21T10:30:00Z",
  "completed_at": "2024-07-21T10:30:45Z"
}
                     `} />
                </Endpoint>

                 <Endpoint method="POST" path="/agents" description="Create a new agent dynamically from a configuration object.">
                     <CodeBlock language="json" code={`
// REQUEST BODY
{
  "id": "dynamic-greeter-01",
  "role": "A friendly agent to greet new users.",
  "llm": {
    "model": "gemini-2.5-flash",
    "system_instruction": "Welcome users warmly."
  }
}

// RESPONSE (201 CREATED)
{
  "agent_id": "dynamic-greeter-01",
  "status": "IDLE"
}
                     `} />
                </Endpoint>

                <Endpoint method="GET" path="/agents" description="List all available agents in the system.">
                     <CodeBlock language="json" code={`
// RESPONSE (200 OK)
{
  "agents": [
    { "agent_id": "research-agent-01", "status": "IDLE" },
    { "agent_id": "writer-agent-03", "status": "THINKING" }
  ]
}
                     `} />
                </Endpoint>
                
            </div>
        </section>
    );
};

export default ApiAccess;