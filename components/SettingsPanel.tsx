
import React, { useState, useEffect } from 'react';

interface SettingsPanelProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    systemInstruction: string;
    setSystemInstruction: (instruction: string) => void;
    supervisorInstruction: string;
    setSupervisorInstruction: (instruction:string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
    isOpen, 
    setIsOpen, 
    systemInstruction, 
    setSystemInstruction,
    supervisorInstruction,
    setSupervisorInstruction
}) => {
    const [localSystemInstruction, setLocalSystemInstruction] = useState(systemInstruction);
    const [localSupervisorInstruction, setLocalSupervisorInstruction] = useState(supervisorInstruction);

    useEffect(() => {
        setLocalSystemInstruction(systemInstruction);
    }, [systemInstruction]);

    useEffect(() => {
        setLocalSupervisorInstruction(supervisorInstruction);
    }, [supervisorInstruction]);

    const handleApply = () => {
        setSystemInstruction(localSystemInstruction);
        setSupervisorInstruction(localSupervisorInstruction);
        setIsOpen(false);
    };

    return (
        <div 
            className={`fixed top-0 right-0 h-full bg-gray-950/80 backdrop-blur-md border-l border-purple-500/30 shadow-2xl shadow-purple-900/50 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ width: 'clamp(300px, 30vw, 500px)' }}
            aria-hidden={!isOpen}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-1/2 -translate-y-1/2 -left-12 p-2 bg-gray-900/80 backdrop-blur-md border-l border-t border-b border-purple-500/50 rounded-l-lg transition-colors duration-300 ease-in-out hover:bg-purple-900/50"
                aria-label="Toggle custom instructions panel"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold neon-text" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>
                    Custom Instructions
                </h2>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="system-instruction" className="block text-sm font-semibold text-purple-300 mb-2">
                        System Orchestrator Instruction
                    </label>
                    <textarea
                        id="system-instruction"
                        rows={8}
                        value={localSystemInstruction}
                        onChange={(e) => setLocalSystemInstruction(e.target.value)}
                        className="w-full bg-gray-900/80 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                        placeholder="Define the core behavior of the main agent..."
                    />
                </div>
                <div>
                     <label htmlFor="supervisor-instruction" className="block text-sm font-semibold text-pink-300 mb-2">
                        AI Supervisor Instruction
                    </label>
                    <textarea
                        id="supervisor-instruction"
                        rows={8}
                        value={localSupervisorInstruction}
                        onChange={(e) => setLocalSupervisorInstruction(e.target.value)}
                        className="w-full bg-gray-900/80 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-sm"
                        placeholder="Define the meta-level analysis and guidance behavior..."
                    />
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={handleApply}
                    className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-500 disabled:bg-gray-600 transition-colors"
                >
                    Apply Instructions
                </button>
            </div>
        </div>
    );
};

export default SettingsPanel;
