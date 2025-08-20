import React from 'react';
import { UserButton } from '@clerk/clerk-react';

interface HeaderProps {
    onMenuClick: () => void;
    clerkEnabled: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, clerkEnabled }) => {
    return (
        <header className="md:hidden flex items-center justify-between w-full p-4 bg-gray-950/70 backdrop-blur-md border-b border-purple-500/20 fixed top-0 left-0 z-40">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414m15.556 15.556l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a5 5 0 100-10 5 5 0 000 10z"></path></svg>
                </div>
                <h1 className="text-xl font-bold text-white neon-text" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>ADK</h1>
            </div>
            <div className="flex items-center gap-4">
                {clerkEnabled && <UserButton afterSignOutUrl="/" />}
                <button onClick={onMenuClick} className="p-2 text-slate-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </header>
    );
};

export default Header;