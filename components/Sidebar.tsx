import React from 'react';
import { NavItem } from '../types.ts';

interface SidebarProps {
    navItems: NavItem[];
    activeView: string;
    isMobileOpen: boolean;
    setMobileOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, activeView, isMobileOpen, setMobileOpen }) => {
    
    const desktopClasses = "w-64 bg-gray-950/70 backdrop-blur-md border-r border-purple-500/20 p-4 flex-col justify-between hidden md:flex transition-all duration-300";
    const mobileClasses = isMobileOpen ? "fixed inset-0 bg-gray-950/90 backdrop-blur-md z-50 p-4 flex flex-col justify-between" : "hidden";

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, navId: string) => {
        e.preventDefault();
        window.location.hash = navId;
        if (isMobileOpen) {
            setMobileOpen(false);
        }
    };
    
    const content = (
        <>
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414m15.556 15.556l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a5 5 0 100-10 5 5 0 000 10z"></path></svg>
                    </div>
                    <h1 className="text-xl font-bold text-white neon-text" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>ADK</h1>
                    {isMobileOpen && (
                        <button onClick={() => setMobileOpen(false)} className="ml-auto p-2 text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                </div>
                <nav className="space-y-2">
                    {navItems.map(item => (
                        <a 
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => handleLinkClick(e, item.id)} 
                            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${activeView === item.id ? 'bg-purple-500/20 text-white font-semibold border-l-4 border-purple-400 pl-2' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
            <div className="text-xs text-gray-600 p-4">Interactive ADK v1.0</div>
        </>
    );

    return (
        <>
           <aside className={desktopClasses}>
                {content}
           </aside>
           <div className={mobileClasses}>
                {content}
           </div>
        </>
    );
};

export default Sidebar;