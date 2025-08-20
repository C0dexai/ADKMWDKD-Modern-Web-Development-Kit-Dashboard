import React from 'react';
import CodeBlock from '../CodeBlock.tsx';

// Updated card to ensure consistent height in a grid
const SampleAgentCard = ({ title, description, config, glowColor }: { title: string, description: string, config: string, glowColor: string }) => (
    <div className="semi-transparent-card p-6 flex flex-col h-full" style={{ '--glow-color': glowColor } as React.CSSProperties}>
        <div>
            <h3 className="text-xl font-bold mb-2 neon-text" style={{ '--glow-color': glowColor } as React.CSSProperties}>{title}</h3>
            <p className="text-gray-300 mb-4 text-sm">{description}</p>
        </div>
        <div className="mt-auto">
            <CodeBlock code={config} language="yaml" />
        </div>
    </div>
);


const SampleAgents: React.FC = () => {
    const socialMediaAgentConfig = `
id: social-media-manager-01
role: "A marketing assistant that creates social media posts."
orchestration:
  - agent: researcher-01
    task: "Find 3 trending topics about AI in healthcare."
    output: "topics"
  - agent: writer-01
    task: "Write a 280-character post about {{topics}}."
    output: "draft_post"
tools:
  - WebSearch
  - ContentWriter
`;

    const codeReviewAgentConfig = `
id: code-reviewer-01
role: "An AI assistant that reviews code for quality and bugs."
trigger:
  type: "webhook"
  source: "github"
  event: "pull_request.opened"
llm:
  system_instruction: "You are a senior engineer. Review the provided code diff for bugs, style issues, and suggest improvements. Be constructive."
tools:
  - FileIO # To read repo files
  - CodeInterpreter # To analyze code patterns
`;

    const supportAgentConfig = `
id: support-triage-01
role: "A first-line customer support agent."
trigger:
  type: "api"
  endpoint: "/support/chat"
llm:
  system_instruction: "You are a friendly support agent. First, try to answer the user's question using the provided knowledge base. If you cannot find an answer, use the HumanHandoff tool."
tools:
  - KnowledgeBaseSearch # Custom tool
  - HumanHandoff
`;

const uiDesignerAgentConfig = `
id: ui-ux-designer-01
role: "A creative AI assistant that translates app ideas into UI/UX design briefs."
llm:
  model: "gemini-2.5-flash"
  system_instruction: >
    You are a senior UI/UX designer. Based on the user's prompt,
    generate a detailed design brief. The brief should include
    user flow steps, wireframe concepts as text descriptions,
    and key accessibility considerations.
tools: []
`;

    const firstRunAgentConfig = `
id: onboarding-guide-01
role: "A friendly guide to walk new users through setup."
orchestration:
  - task: "Welcome user and explain step 1: Project setup."
    output: "step1_explanation"
  - tool: HumanHandoff
    input:
      reason: "Waiting for user to confirm completion of step 1."
      prompt: "Have you set up your project? Type 'yes' to continue."
  - task: "Explain step 2: Creating your first agent."
    output: "step2_explanation"
tools:
  - HumanHandoff
`;

    const implStrategistAgentConfig = `
id: implementation-strategist-01
role: "A technical project manager that creates actionable development plans."
llm:
  model: "gemini-2.5-flash"
  system_instruction: >
    You are a technical project manager. Decompose the given
    high-level feature request into a list of specific,
    well-defined user stories and engineering tasks.
    Each task should have a clear goal.
tools: []
`;
    
    const agentSupervisorConfig = `
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
      url: "/api/v1/agents"
    output: "agent_statuses"
  - agent: self
    task: >
      Analyze the '{{agent_statuses}}'. If any agent has
      status 'ERROR', use the 'AlertingTool' to notify the
      on-call engineer.
tools:
  - ApiCaller
  - AlertingTool # Custom tool for notifications
`;


    return (
        <section id="samples" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{ '--glow-color': 'var(--neon-blue)' } as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{ '--glow-color': 'var(--neon-blue)' } as React.CSSProperties}>
                    Sample Agents
                </h2>
                <p className="text-lg text-gray-300">
                    Explore these sample agent configurations to understand the power and flexibility of the ADK. Use them as templates for your own creations.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SampleAgentCard 
                    title="Social Media Manager"
                    description="This multi-agent workflow automates content creation. A researcher finds topics, and a writer drafts the post."
                    config={socialMediaAgentConfig}
                    glowColor="var(--neon-blue)"
                />
                 <SampleAgentCard 
                    title="Automated Code Reviewer"
                    description="This agent integrates with GitHub. When a pull request is opened, it automatically reviews the code and posts comments."
                    config={codeReviewAgentConfig}
                    glowColor="var(--neon-purple)"
                />
                 <SampleAgentCard 
                    title="Customer Support Triage"
                    description="This agent acts as the first point of contact for support. It answers common questions and escalates complex issues to a human."
                    config={supportAgentConfig}
                    glowColor="var(--neon-green)"
                />
                 <SampleAgentCard 
                    title="UI / UX Designer"
                    description="An agent that takes a natural language prompt and generates a structured UI/UX design brief, including user flows and wireframe concepts."
                    config={uiDesignerAgentConfig}
                    glowColor="var(--neon-pink)"
                />
                 <SampleAgentCard 
                    title="First Run Agent Guidance"
                    description="An onboarding agent that guides new users through a multi-step process, pausing and waiting for user input at each stage."
                    config={firstRunAgentConfig}
                    glowColor="var(--neon-green)"
                />
                <SampleAgentCard 
                    title="Implementation Strategist"
                    description="A project management agent that takes a high-level feature request and breaks it down into a structured list of engineering tasks."
                    config={implStrategistAgentConfig}
                    glowColor="var(--neon-blue)"
                />
                 <SampleAgentCard 
                    title="Agent Supervisor"
                    description="A proactive monitoring agent that runs on a schedule to check the health of other agents and triggers alerts if any are in an error state."
                    config={agentSupervisorConfig}
                    glowColor="var(--neon-purple)"
                />
            </div>
        </section>
    );
};

export default SampleAgents;