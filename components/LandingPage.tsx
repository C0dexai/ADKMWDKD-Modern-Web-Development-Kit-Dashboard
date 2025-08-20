
import React from 'react';

const FeatureCard = ({ icon, title, description, glowColor }: { icon: React.ReactNode, title: string, description: string, glowColor: string }) => (
    <div className="semi-transparent-card p-6 text-center h-full flex flex-col items-center" style={{ '--glow-color': glowColor, animation: 'fadeInUp 1s ease-out forwards', opacity: 0 } as React.CSSProperties}>
        <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: `${glowColor}1A`, border: `1px solid ${glowColor}33` }}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 neon-text" style={{ '--glow-color': glowColor } as React.CSSProperties}>{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
    </div>
);

const LandingPage = ({ onEnter }: { onEnter: () => void }) => {
    return (
        <div className="w-full h-screen overflow-y-auto text-white" style={{ scrollbarWidth: 'thin' }}>
            <main className="container mx-auto px-4">
                {/* Hero Section */}
                <section className="min-h-screen flex flex-col items-center justify-center text-center py-20 relative">
                    <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414m15.556 15.556l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a5 5 0 100-10 5 5 0 000 10z"></path></svg>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter neon-text" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>
                            Advanced Agent Development Kit
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 my-8">
                            Build, Deploy, and Orchestrate the Next Generation of AI Agents. Your complete solution for creating sophisticated, autonomous systems.
                        </p>
                        <button 
                            onClick={onEnter}
                            className="text-lg font-semibold px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20"
                        >
                            Launch Dashboard
                        </button>
                    </div>
                    <div className="absolute bottom-10 animate-bounce fade-in-up" style={{ animationDelay: '1s' }}>
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20">
                    <div className="text-center mb-12 fade-in-up">
                        <h2 className="text-4xl font-bold neon-text" style={{ '--glow-color': 'var(--neon-blue)' } as React.CSSProperties}>A Unified Framework for AI Agents</h2>
                        <p className="max-w-3xl mx-auto mt-4 text-gray-400">
                            The ADK is a comprehensive toolkit designed to simplify the entire lifecycle of AI agent development. From initial concept to production monitoring, we provide the tools you need to build robust and intelligent automated systems.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard 
                            title="Modular & Extensible"
                            description="Build agents from reusable components. Easily add new tools, models, and communication channels to adapt to any challenge."
                            glowColor="var(--neon-purple)"
                            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
                        />
                         <FeatureCard 
                            title="Powerful Orchestration"
                            description="Define complex workflows where multiple agents collaborate to solve problems, passing context and results seamlessly."
                            glowColor="var(--neon-green)"
                            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>}
                        />
                         <FeatureCard 
                            title="Full Observability"
                            description="Gain deep insights with live monitoring, detailed logging, and performance dashboards. Understand every decision your agents make."
                            glowColor="var(--neon-pink)"
                            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        />
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-20 text-center fade-in-up">
                    <h2 className="text-4xl font-bold mb-4 neon-text" style={{ '--glow-color': 'var(--neon-green)' } as React.CSSProperties}>Ready to Build the Future?</h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Dive into the dashboard and start creating your first agent in minutes.
                    </p>
                     <button 
                        onClick={onEnter}
                        className="text-lg font-semibold px-8 py-4 rounded-lg bg-green-600 hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20"
                    >
                        Get Started Now
                    </button>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;