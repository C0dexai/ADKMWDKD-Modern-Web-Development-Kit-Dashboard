

import React from 'react';
import CodeBlock from '../CodeBlock.tsx';

interface CoreComponentCardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
    instructions: string;
    code: string;
    codeLanguage: string;
}

const CoreComponentCard: React.FC<CoreComponentCardProps> = ({ title, icon, description, instructions, code, codeLanguage }) => (
    <div className="semi-transparent-card p-6 flex flex-col h-full" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
        <div className="flex items-center text-pink-300 mb-3">
            <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20 mr-4">
                {icon}
            </div>
            <h4 className="text-lg font-semibold">{title}</h4>
        </div>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        {/* Removed mt-auto to ensure consistent spacing from the description above, preventing large gaps. */}
        <div className="space-y-4">
            <div>
                <h5 className="font-semibold text-pink-200 mb-2">Custom Instructions</h5>
                <p className="text-sm text-gray-400 italic">"{instructions}"</p>
            </div>
            
            <div>
                 <h5 className="font-semibold text-pink-200 mb-2">Configuration Example</h5>
                <CodeBlock code={code} language={codeLanguage} />
            </div>
        </div>
    </div>
);

const AgentCore: React.FC = () => {
    return (
        <section id="agent-core" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                    Anatomy of an Agent
                </h2>
                <p className="text-lg text-gray-300">
                    Each agent is a self-contained entity composed of the following core components. Master these building blocks to create sophisticated, autonomous agents tailored to any task.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CoreComponentCard 
                    title="Identity & Role"
                    description="The agent's purpose. This includes a unique ID and a high-level role description that guides its behavior and decision-making process."
                    instructions="Be specific. Instead of 'a helpful assistant', define a clear persona like 'A senior financial analyst who provides concise, data-driven insights and avoids speculative language.'"
                    code={`
id: financial-analyst-007
role: >
  A senior financial analyst who provides concise,
  data-driven insights and avoids speculative language.
                    `}
                    codeLanguage="yaml"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4" /></svg>}
                />
                 <CoreComponentCard 
                    title="LLM Configuration"
                    description="The agent's brain. Defines the core language model, its system instruction, and parameters like temperature, shaping its personality and response style."
                    instructions="Use the system instruction to enforce strict rules. For example: 'You are a translator. You MUST only respond with the French translation of the user's text. Do not add any extra words or pleasantries.'"
                    code={`
llm:
  model: "gemini-2.5-flash"
  temperature: 0.2
  system_instruction: >
    You are a translator. You MUST only respond with the
    French translation of the user's text. Do not add
    any extra words or pleasantries.
                    `}
                    codeLanguage="yaml"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3m4.95-12.05l-1.414 1.414M4.5 19.5l1.414-1.414" /></svg>}
                />
                 <CoreComponentCard 
                    title="State & Memory"
                    description="The agent's consciousness. Includes short-term memory (the current conversation context) and long-term memory for recalling past interactions."
                    instructions="Enable long-term memory to allow follow-up questions across different sessions. You could ask: 'Based on the report I asked you to summarize yesterday, what was the key takeaway?'"
                    code={`
memory:
  # Short-term memory is on by default
  long_term:
    enabled: true
    provider: "vector_db"
    config:
      collection_name: "financial-analyst-memory"
                    `}
                    codeLanguage="yaml"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.955 16h8.09" /></svg>}
                />
                <CoreComponentCard 
                    title="Tools & Skills"
                    description="The agent's hands. A set of functions the agent can call to interact with the world, like searching the web or querying a database."
                    instructions="Grant tools by listing them. To create a researcher, tell it: 'Use the WebSearch tool to find three recent articles on quantum computing, then use the FileIO tool to save their summaries to 'research.txt'.'"
                    code={`
tools:
  - WebSearch
  - FileIO
  - name: "custom_crm_lookup"
    description: "Looks up customer data via email."
                    `}
                    codeLanguage="yaml"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
                 <CoreComponentCard 
                    title="Triggers"
                    description="The agent's senses. Defines the events that can activate the agent, such as an API call, a schedule, or a webhook from another service."
                    instructions="To create a proactive agent, use a scheduled trigger. You could instruct it: 'Every Monday at 9 AM, run the 'generate_weekly_report' task.'"
                    code={`
trigger:
  type: schedule
  config:
    # Runs at 9 AM every Monday
    cron: "0 9 * * 1"
    task_input: "Generate the weekly financial summary."
                    `}
                    codeLanguage="yaml"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                />
                 <CoreComponentCard 
                    title="Lifecycle"
                    description="The agent's state machine. Defines the states an agent can be in, such as 'Idle', 'Thinking' (planning/calling LLM), or 'Acting' (using a tool)."
                    instructions="This is a runtime property. Observe the lifecycle via the API or Admin UI to understand its behavior. If a task is slow, check if the agent is stuck in the 'Thinking' state."
                    code={`
// Example: GET /api/v1/agents/financial-analyst-007
{
  "agent_id": "financial-analyst-007",
  "status": "ACTING",
  "current_task": {
    "task_id": "task-xyz-123",
    "step": "Executing tool 'WebSearch'...",
    "started_at": "2024-07-22T14:00:15Z"
  }
}
                    `}
                    codeLanguage="json"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
            </div>

            <div>
                <h3 className="text-2xl font-bold mt-12 mb-6 neon-text" style={{'--glow-color': 'var(--neon-pink)'} as React.CSSProperties}>Trigger Configurations in Detail</h3>
                <div className="space-y-8">
                    {/* Schedule Trigger */}
                    <div className="semi-transparent-card p-6" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                        <h4 className="font-bold text-lg mb-2 text-pink-300">Schedule Trigger</h4>
                        <p className="text-gray-400 mb-4">
                            Use a schedule trigger to run an agent at a specific time or on a recurring basis. This is perfect for generating reports, performing routine maintenance, or any task that needs to happen automatically on a schedule. It uses standard cron syntax.
                        </p>
                        <CodeBlock code={`
trigger:
  type: schedule
  config:
    # Runs at 9 AM (UTC) every Monday
    cron: "0 9 * * 1"
    task_input: "Generate the weekly financial summary and email it to management."
`} language="yaml" />
                    </div>

                    {/* Webhook Trigger */}
                    <div className="semi-transparent-card p-6" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                        <h4 className="font-bold text-lg mb-2 text-pink-300">Webhook Trigger</h4>
                        <p className="text-gray-400 mb-4">
                            A webhook trigger allows an external service to activate your agent by sending an HTTP POST request to a unique URL. This is ideal for integrations with third-party systems like GitHub, Stripe, or Slack. The incoming request body is passed as input to the agent.
                        </p>
                        <CodeBlock code={`
trigger:
  type: webhook
  source: github # A descriptive name for the source
  # The ADK will provide a unique URL for this trigger,
  # e.g., https://api.adk.example.com/webhooks/github/code-reviewer-01

# When a GitHub pull request is opened, it sends a payload.
# The agent can be instructed to process this payload.
# Example task input: "Review the code changes in the provided pull request payload."
`} language="yaml" />
                    </div>

                    {/* API Trigger */}
                    <div className="semi-transparent-card p-6" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                        <h4 className="font-bold text-lg mb-2 text-pink-300">API Trigger</h4>
                        <p className="text-gray-400 mb-4">
                            Expose your agent via a dedicated REST API endpoint. This allows your own applications or authorized third parties to programmatically invoke the agent and receive a structured response. It's the most flexible way to integrate agent capabilities into other software.
                        </p>
                        <CodeBlock code={`
trigger:
  type: api
  # The ADK will create an endpoint for this agent,
  # e.g., POST /api/v1/agents/support-triage-01/invoke
  config:
    # Define an input schema for request body validation (optional but recommended)
    input_schema:
      type: object
      properties:
        customer_email:
          type: string
        message:
          type: string
      required: ["customer_email", "message"]
`} language="yaml" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgentCore;