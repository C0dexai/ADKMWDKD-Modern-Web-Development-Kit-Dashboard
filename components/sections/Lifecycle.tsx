import React from 'react';
import CodeBlock from '../CodeBlock.tsx';

const PhaseCard = ({ number, title, description, children, glowColor }: { number: number, title: string, description: string, children: React.ReactNode, glowColor: string }) => (
    <div className="semi-transparent-card p-6 md:p-8" style={{ '--glow-color': glowColor } as React.CSSProperties}>
        <div className="flex items-start mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 mr-6 flex-shrink-0" style={{ borderColor: glowColor, color: glowColor }}>
                <span className="text-2xl font-bold">{number}</span>
            </div>
            <div>
                <h3 className="text-2xl font-bold neon-text" style={{ '--glow-color': glowColor } as React.CSSProperties}>{title}</h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </div>
        <div className="pl-0 md:pl-18">
            {children}
        </div>
    </div>
);

const projectStructureCode = `
my-agent-project/
├── agents/
│   ├── researcher.yaml
│   └── writer.yaml
├── tools/
│   ├── custom_crm_tool.ts
│   └── package.json
├── workflows/
│   └── social-media-workflow.yaml
└── adk.config.json
`;

const supervisorAgentCode = `
id: agent-supervisor-01
role: "A monitoring agent that ensures the health of the agent workforce."
trigger:
  type: schedule
  config:
    cron: "*/5 * * * *" # Every 5 minutes
orchestration:
  - tool: ApiCaller
    input:
      method: "GET"
      url: "/api/v1/agents" # Calls the ADK's own API
    output: "agent_statuses"
  - agent: self
    task: >
      Analyze '{{agent_statuses}}'. If any agent has status
      'ERROR', use the 'AlertingTool' to notify the on-call engineer.
tools:
  - ApiCaller
  - AlertingTool # Custom tool for PagerDuty/Slack
`;

const Lifecycle: React.FC = () => {
    return (
        <section id="lifecycle" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                    The Agent Lifecycle: A Strategy Guide
                </h2>
                <p className="text-lg text-gray-300">
                    This guide provides the strategic workflow for building, deploying, and maintaining agents within the ADK ecosystem. It clarifies the roles of the Builder (developer) and the Operator (maintainer) and shows how the ADK tools and this dashboard work together.
                </p>
            </div>
            
            <div className="space-y-12">
                <PhaseCard number={1} title="Develop & Build" description="The Builder's Workbench: Crafting the agent's logic on your local machine." glowColor="var(--neon-blue)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-lg text-blue-300 mb-2">Local Project Structure</h4>
                            <p className="text-sm text-gray-400 mb-4">Use the ADK CLI to initialize a project. You'll edit YAML and TypeScript files to define your agents, tools, and workflows.</p>
                             <CodeBlock code={projectStructureCode} language="bash" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-blue-300 mb-2">Key Activities</h4>
                             <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                                <li>Define agent roles and LLM configs in <code className="bg-gray-700 p-1 rounded">.yaml</code> files.</li>
                                <li>Implement custom tools in TypeScript.</li>
                                <li>Create complex workflows connecting multiple agents.</li>
                                <li>Test agents locally using <code className="bg-gray-700 p-1 rounded">adk run &lt;agent_name&gt;</code>.</li>
                                <li>Commit your code to a version control system like Git.</li>
                            </ul>
                        </div>
                    </div>
                </PhaseCard>

                <div className="flex justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>

                <PhaseCard number={2} title="Deploy & Operate" description="The Operator's Command Center: Pushing agents to a live environment and monitoring their performance." glowColor="var(--neon-green)">
                    <p className="text-sm text-gray-400 mb-4">Once built, agents are packaged (e.g., into a Docker container) and deployed to a server. This dashboard is your primary interface for interacting with these live, operational agents.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <h4 className="font-semibold text-lg text-green-300 mb-2">Key Activities</h4>
                             <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                                <li>Use CI/CD pipelines to automate deployment.</li>
                                <li>Use the <b className="text-white">Admin Dashboard</b> to monitor agent health, task volume, and errors.</li>
                                <li>Use the <b className="text-white">Live Playground</b> to interact with deployed agents for debugging.</li>
                                <li>Integrate external applications using the <b className="text-white">REST API</b>.</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold text-lg text-green-300 mb-2">The Handoff</h4>
                            <p className="text-sm text-gray-400">The `build` process is the handoff from the Builder to the Operator. The Operator doesn't need to manage the source code, only the deployed application and the agents running within it.</p>
                        </div>
                    </div>
                </PhaseCard>

                 <div className="flex justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20v-5h5M20 4v5h-5" /></svg>
                </div>

                <PhaseCard number={3} title="Iterate & Improve" description="The AI-Powered Feedback Loop: Using insights and meta-agents to enhance the system." glowColor="var(--neon-pink)">
                    <p className="text-sm text-gray-400 mb-4">A deployed system provides valuable data. This data feeds back into the development process, creating a virtuous cycle of improvement. This can even be automated with a "Guidance Agent."</p>
                    <div>
                         <h4 className="font-semibold text-lg text-pink-300 mb-2">The Guidance Agent (Concierge)</h4>
                        <p className="text-sm text-gray-400 mb-2">You can deploy a special meta-agent that monitors the health of other agents. This "Agent Supervisor" acts as an AI concierge for the operator, proactively identifying and reporting issues. It uses the ADK's own API to supervise the system it's part of.</p>
                         <CodeBlock code={supervisorAgentCode} language="yaml" />
                        <p className="text-sm text-gray-400 mt-2">The alerts from this agent create a data-driven reason to loop back to Phase 1, creating a smarter, more resilient system over time.</p>
                    </div>
                </PhaseCard>
            </div>
        </section>
    );
};

export default Lifecycle;
