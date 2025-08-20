import React from 'react';
import CodeBlock from '../CodeBlock.tsx';

const GettingStarted: React.FC = () => {

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault();
        window.location.hash = hash;
    };

    return (
        <section id="getting-started" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>
                    Getting Started
                </h2>
                <p className="text-lg text-gray-300 mb-8">Follow these steps to create and run your first agent in under 5 minutes.</p>
            </div>

            <div className="space-y-10">
                {/* Step 1 */}
                <div>
                    <h3 className="text-2xl font-semibold mb-3 flex items-center"><span className="text-green-400 mr-4 text-3xl font-mono">1</span>Install the ADK Command Line Interface</h3>
                    <p className="text-gray-400 mb-4">The ADK CLI is your primary tool for scaffolding projects, managing agents, and interacting with the ADK runtime.</p>
                    <CodeBlock code={'npm install -g @adk/cli'} language="bash" />
                </div>

                {/* Step 2 */}
                <div>
                    <h3 className="text-2xl font-semibold mb-3 flex items-center"><span className="text-green-400 mr-4 text-3xl font-mono">2</span>Initialize Your First Project</h3>
                    <p className="text-gray-400 mb-4">This command creates a new directory with the necessary boilerplate for an agent project, including configuration files and a sample agent definition.</p>
                    <CodeBlock code={'adk init my-first-agent-project\\ncd my-first-agent-project'} language="bash" />
                </div>

                {/* Step 3 */}
                <div>
                    <h3 className="text-2xl font-semibold mb-3 flex items-center"><span className="text-green-400 mr-4 text-3xl font-mono">3</span>Define Your Agent</h3>
                    <p className="text-gray-400 mb-4">Agent definitions are simple YAML files. Open \`agents/greeter.yaml\` and inspect its contents. It defines an agent that uses a simple instruction to greet a user.</p>
                    <CodeBlock
                        code={`
id: greeter-001
role: "A friendly agent that provides a warm welcome."
llm:
  model: "gemini-2.5-flash"
  system_instruction: "You are a cheerful greeter. Welcome the user to the ADK and express excitement for their journey into agent development."
tools: []
`
                        }
                        language="yaml"
                    />
                </div>

                {/* Step 4 */}
                 <div>
                    <h3 className="text-2xl font-semibold mb-3 flex items-center"><span className="text-green-400 mr-4 text-3xl font-mono">4</span>Run the Agent</h3>
                    <p className="text-gray-400 mb-4">Use the \`run\` command to start your agent in an interactive terminal session. This drops you into a chat interface where you can talk to your agent directly.</p>
                    <CodeBlock code={'adk run greeter'} language="bash" />
                    <p className="mt-4 text-gray-400">You can also test your agent right here in the dashboard!</p>
                     <a href="#playground" onClick={(e) => handleNavClick(e, 'playground')} className="inline-block mt-2 bg-green-600/80 hover:bg-green-500/80 text-white font-bold py-2 px-4 rounded transition-colors">
                        Go to Live Playground
                    </a>
                </div>

                {/* Next Steps */}
                <div className="p-6 semi-transparent-card border-green-500/30">
                    <h3 className="text-2xl font-semibold mb-3 neon-text" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>Next Steps</h3>
                    <p className="text-gray-300 mb-4">Congratulations, you've built and run your first agent!</p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Explore the <a href="#architecture" onClick={(e) => handleNavClick(e, 'architecture')} className="text-blue-400 hover:underline">Architecture</a> to understand how the ADK works.</li>
                        <li>Learn how to connect multiple agents in the <a href="#orchestration" onClick={(e) => handleNavClick(e, 'orchestration')} className="text-purple-400 hover:underline">Orchestration</a> section.</li>
                        <li>Browse the <a href="#samples" onClick={(e) => handleNavClick(e, 'samples')} className="text-pink-400 hover:underline">Sample Agents</a> for more complex examples.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default GettingStarted;