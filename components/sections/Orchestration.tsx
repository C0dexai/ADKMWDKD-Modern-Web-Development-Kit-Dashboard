import React from 'react';

const BlueprintIcon = ({ children, color }: { children: React.ReactNode, color: string }) => (
    <div className="p-3 bg-gray-700/20 rounded-full mb-4 self-start" style={{ color }}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {children}
        </svg>
    </div>
);

const blueprintData = [
    {
        title: 'API-Based Cross-Domain Orchestration',
        content: 'Establish secure REST API endpoints for communication and data transfer. All orchestration tasks are triggered and tracked via API calls, ensuring real-time updates and traceability.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
        color: 'var(--neon-blue)',
    },
    {
        title: 'Agent-to-Agent (A2A) Coordination',
        content: 'Designated agents (e.g., Lyra, Kara) handle contextual handoff and task supervision. They autonomously negotiate updates and maintain a "context ledger" for intent and rationale.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
        color: 'var(--neon-purple)',
    },
    {
        title: 'Contextual & Autonomous Knowledge Management',
        content: 'AI agents monitor for knowledge base changes, new documentation, or presentation assets needing update or review, autonomously triggering cross-domain pushes or pulls.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
        color: 'var(--neon-green)',
    },
    {
        title: 'Supervised Guidance via Cross-Relational Intelligence',
        content: 'Both GEMINI and OPENAI act as supervisory "meta agents," providing oversight, arbitrating conflicts, and augmenting context. Human operators retain override and veto power.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />,
        color: 'var(--neon-pink)',
    },
    {
        title: 'Continuous Presentation & Documentation Workflow',
        content: 'Presentation assets, reports, and documents are version-controlled and automatically updated across both domains. Agent-supported templates and workflows ensure all presentations reflect the latest intelligence and standards.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        color: 'var(--neon-blue)',
    },
];

const benefits = [
    'Zero-lag knowledge propagation across all supervised domains.',
    'No bottlenecks—agents negotiate, update, and sync 24/7, only escalating when human review is actually needed.',
    'Consistent, unified documentation and presentation standards without manual intervention.',
    'Meta-level context and nuance awareness—so your system never "forgets" why an update was made or who’s responsible.',
];

const Orchestration: React.FC = () => {
    return (
        <section id="orchestration" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>
                    Cross-Domain AI Orchestration
                </h2>
                <p className="text-gray-400 text-sm mb-4 uppercase tracking-wider">Via API & Agent-to-Agent Nuance</p>
                <p className="text-lg text-gray-300">
                    Enable seamless, supervised, and autonomous collaboration between AI agents operating across two distinct domains, coordinating updates, upgrades, and knowledge synchronization using both GEMINI and OPENAI as foundational intelligence engines.
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-6 neon-text" style={{'--glow-color': 'var(--neon-blue)'} as React.CSSProperties}>Operational Blueprint</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blueprintData.map((item, index) => (
                         <div key={index} className="semi-transparent-card p-6 flex flex-col" style={{ '--glow-color': item.color, borderColor: item.color } as React.CSSProperties}>
                            <div className="flex items-center text-white mb-3">
                                <BlueprintIcon color={item.color}>{item.icon}</BlueprintIcon>
                                <h4 className="text-lg font-semibold ml-4">{item.title}</h4>
                            </div>
                            <p className="text-gray-300 text-sm flex-grow">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-3 p-6 semi-transparent-card" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>
                    <h3 className="text-xl font-bold mb-4 neon-text" style={{'--glow-color': 'var(--neon-green)'} as React.CSSProperties}>Key Benefits</h3>
                    <ul className="space-y-3">
                       {benefits.map((benefit, index) => (
                           <li key={index} className="flex items-start">
                               <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                               <span className="text-gray-300">{benefit}</span>
                           </li>
                       ))}
                    </ul>
                </div>
                
                <div className="md:col-span-2 p-6 semi-transparent-card flex flex-col justify-center" style={{ '--glow-color': 'var(--neon-pink)' } as React.CSSProperties}>
                    <blockquote className="border-l-4 border-pink-400 pl-4 text-gray-300 italic">
                        "This system orchestrates agent-to-agent automation and knowledge management across two domains via API, leveraging supervised cross-relational intelligence from GEMINI and OPENAI for fully autonomous, contextual, and auditable updates and documentation workflows."
                    </blockquote>
                </div>
            </div>

        </section>
    );
};

export default Orchestration;
