import React, { useState } from 'react';
import CodeBlock from '../CodeBlock.tsx';

interface ToolInfo {
    title: string;
    description: string;
    icon: React.ReactNode;
    customInstructions: string;
    apiExample: string;
}

const toolsData: ToolInfo[] = [
    {
        title: 'Web Search',
        description: 'Provides the agent with the ability to perform real-time searches on the internet to gather up-to-date information.',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        customInstructions: "To use the web search tool, ask the agent a question about a current event or a topic that requires up-to-date information. For example: 'What were the main announcements from the latest Google I/O event?'",
        apiExample: `
fetch('/api/v1/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ADK_API_KEY'
  },
  body: JSON.stringify({
    agent_id: "research-agent-01",
    tool_choice: "WebSearch",
    input: {
      query: "What are the latest breakthroughs in AI?"
    }
  })
});
        `
    },
    {
        title: 'Code Interpreter',
        description: 'Executes Python code in a sandboxed environment. Allows agents to perform data analysis, run calculations, and manipulate data.',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
        customInstructions: "Provide the agent with a data manipulation or calculation task. You can give it raw data and ask for analysis. For example: 'Given the following CSV data, calculate the average age and plot a histogram.'",
        apiExample: `
fetch('/api/v1/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': '...' },
  body: JSON.stringify({
    agent_id: "data-analyst-01",
    tool_choice: "CodeInterpreter",
    input: {
      code: "import pandas as pd\\n\\ndf = pd.read_csv('data.csv')\\nprint(df.describe())"
    }
  })
});
        `
    },
    {
        title: 'File I/O',
        description: 'Enables agents to read from and write to a local or cloud-based file system. Essential for processing documents and saving results.',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        customInstructions: "Instruct the agent to read, write, or modify a file. For example: 'Read the contents of 'report.txt', summarize it, and save the summary to 'summary.txt'.'",
        apiExample: `
fetch('/api/v1/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': '...' },
  body: JSON.stringify({
    agent_id: "doc-worker-01",
    tool_choice: "FileIO",
    input: {
      operation: "write",
      path: "./summaries/summary.txt",
      content: "This is the summary of the report..."
    }
  })
});
        `
    },
    {
        title: 'Database Query',
        description: 'Connects to SQL databases (PostgreSQL, MySQL, etc.) to fetch or modify data based on natural language queries.',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M4 14h16M4 10h16M4 7h16" /></svg>,
        customInstructions: "Ask the agent a question that requires information from a database. The agent will translate your natural language query into SQL. For example: 'How many users signed up last week?'",
        apiExample: `
fetch('/api/v1/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': '...' },
  body: JSON.stringify({
    agent_id: "db-agent-01",
    tool_choice: "DatabaseQuery",
    input: {
      natural_language_query: "Show me total sales for the last quarter."
    }
  })
});
        `
    },
    {
        title: 'API Caller',
        description: 'A generic tool for making REST API calls to any external service. The agent can specify the method, endpoint, headers, and body.',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        customInstructions: "Tell the agent to interact with a third-party API. You must describe the API endpoint and the goal. For example: 'Fetch the latest weather forecast for London using the OpenWeatherMap API.'",
        apiExample: `
fetch('/api/v1/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': '...' },
  body: JSON.stringify({
    agent_id: "api-caller-01",
    tool_choice: "ApiCaller",
    input: {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=London&appid=API_KEY"
    }
  })
});
        `
    },
    {
        title: 'Human Handoff',
        description: 'A special tool that pauses the workflow and sends a notification to a human operator for input or approval.',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
        customInstructions: "If the agent determines it cannot fulfill a request, it might use this tool. You can also explicitly trigger it for complex or sensitive issues. For example: 'I need to speak with a human agent about my billing issue.'",
        apiExample: `
fetch('/api/v1/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': '...' },
  body: JSON.stringify({
    agent_id: "support-agent-01",
    tool_choice: "HumanHandoff",
    input: {
      reason: "User has a complex billing inquiry requiring human review.",
      user_session_id: "chat-session-xyz"
    }
  })
});
// The task status will become 'PENDING_HUMAN_INPUT'
        `
    }
];

const InteractiveToolCard = ({ tool, isOpen, onClick }: { tool: ToolInfo, isOpen: boolean, onClick: () => void }) => {
    return (
        <div 
            className={`semi-transparent-card p-6 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'ring-2 ring-green-400' : ''}`}
            style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}
        >
            <div className="flex items-center text-green-300 mb-3 cursor-pointer" onClick={onClick}>
                <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20 mr-4">
                    {tool.icon}
                </div>
                <h4 className="text-lg font-semibold">{tool.title}</h4>
                <svg className={`w-5 h-5 ml-auto text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            <p className="text-gray-300 text-sm">{tool.description}</p>
            
            {isOpen && (
                <div className="fade-in mt-4 border-t border-green-500/20 pt-4">
                    <h5 className="font-semibold text-green-200 mb-2">Custom Instructions</h5>
                    <p className="text-sm text-gray-400 italic mb-4">{tool.customInstructions}</p>
                    
                    <h5 className="font-semibold text-green-200 mb-2">API Syntax Example</h5>
                    <CodeBlock code={tool.apiExample} language="javascript" />
                </div>
            )}
        </div>
    );
};

const Tools: React.FC = () => {
    const [expandedTool, setExpandedTool] = useState<string | null>(null);

    const handleToggle = (toolTitle: string) => {
        setExpandedTool(prev => (prev === toolTitle ? null : toolTitle));
    };

    const customToolCode = `
// Example: A robust, type-safe custom tool using Zod
// Make sure to add 'zod' to your project dependencies: npm install zod
import { Tool } from '@adk/core';
import { z } from 'zod';

// Define the input schema using Zod for validation and type inference
const CrmInputSchema = z.object({
    email: z.string().email({ message: "A valid email address is required." }),
    includeOrderHistory: z.boolean().optional().default(false),
});

// Infer the input type from the schema for type safety
type CrmInput = z.infer<typeof CrmInputSchema>;

class CrmTool implements Tool<CrmInput> {
    name = "get_customer_details";
    
    description = "Fetches customer details from the internal CRM. Can optionally include recent order history.";
    
    // The ADK runtime uses this schema to validate input before execution
    inputSchema = CrmInputSchema;

    async execute(validatedInput: CrmInput): Promise<string> {
        try {
            // The input is already validated and typed by the runtime
            const { email, includeOrderHistory } = validatedInput;
            
            const customer = await internalCrmApi.getCustomerByEmail(email);
            if (!customer) {
                return JSON.stringify({ error: \`Customer with email \${email} not found.\` });
            }

            if (includeOrderHistory) {
                const orders = await internalCrmApi.getOrdersForCustomer(customer.id);
                customer.orders = orders;
            }

            return JSON.stringify(customer);
        } catch (error) {
            console.error("CRM Tool Execution Error:", error);
            return JSON.stringify({ error: "An internal error occurred while fetching from the CRM." });
        }
    }
}
`;

    return (
        <section id="tools" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>
                    Tool Ecosystem
                </h2>
                <p className="text-lg text-gray-300">
                    Tools are what allow agents to move beyond conversation and take action. The ADK provides a robust set of built-in tools and a simple interface for creating your own, empowering your agents to interact with any data source or API.
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-6 neon-text" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>Built-in Tool Library</h3>
                 <p className="text-gray-400 mb-6 -mt-4">Click on any tool to see its instructions and API usage.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {toolsData.map(tool => (
                        <InteractiveToolCard 
                            key={tool.title}
                            tool={tool}
                            isOpen={expandedTool === tool.title}
                            onClick={() => handleToggle(tool.title)}
                        />
                    ))}
                </div>
            </div>

            <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-green)'} as React.CSSProperties}>
                <h3 className="text-2xl font-bold mb-4">Creating Custom Tools</h3>
                <p className="text-gray-300 mb-4">
                    The true power of the ADK comes from creating custom tools tailored to your business needs. For robust, type-safe tools, we recommend using a validation library like \`zod\`. The runtime will automatically validate incoming requests against your schema before calling the \`execute\` method.
                </p>
                <CodeBlock 
                    code={customToolCode} 
                    language="typescript" 
                />
            </div>
        </section>
    );
};

export default Tools;