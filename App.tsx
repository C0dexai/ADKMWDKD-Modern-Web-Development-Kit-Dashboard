
import React, { useState, useEffect } from 'react';
import useHashNavigation from './hooks/useHashNavigation.ts';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Overview from './components/sections/Overview.tsx';
import GettingStarted from './components/sections/GettingStarted.tsx';
import Architecture from './components/sections/Architecture.tsx';
import Deployment from './components/sections/Deployment.tsx';
import Tools from './components/sections/Tools.tsx';
import AdminUI from './components/sections/AdminUI.tsx';
import Playground from './components/sections/Playground.tsx';
import SampleAgents from './components/sections/SampleAgents.tsx';
import ApiAccess from './components/sections/ApiAccess.tsx';
import Lifecycle from './components/sections/Lifecycle.tsx';
import AgentCore from './components/sections/AgentCore.tsx';
import Communication from './components/sections/Communication.tsx';
import Orchestration from './components/sections/Orchestration.tsx';
import LandingPage from './components/LandingPage.tsx';
import { NAV_ITEMS, DEFAULT_SYSTEM_INSTRUCTION, DEFAULT_SUPERVISOR_INSTRUCTION } from './constants.tsx';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import SignInPage from './components/SignInPage.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';

const App: React.FC<{ clerkEnabled: boolean }> = ({ clerkEnabled }) => {
    const [onLandingPage, setOnLandingPage] = useState(() => !window.location.hash);
    
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const activeView = useHashNavigation(onLandingPage ? 'landing' : 'overview');

    const [isSettingsPanelOpen, setSettingsPanelOpen] = useState(false);
    const [systemInstruction, setSystemInstruction] = useState(DEFAULT_SYSTEM_INSTRUCTION);
    const [supervisorInstruction, setSupervisorInstruction] = useState(DEFAULT_SUPERVISOR_INSTRUCTION);

    useEffect(() => {
        const handleHashChange = () => {
            if (onLandingPage && window.location.hash && window.location.hash !== '#landing') {
                setOnLandingPage(false);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [onLandingPage]);

    useEffect(() => {
        if (onLandingPage) {
            document.body.classList.add('landing-page-active');
            document.body.classList.remove('app-active');
        } else {
            document.body.classList.remove('landing-page-active');
            document.body.classList.add('app-active');
        }
    }, [onLandingPage]);

    const handleEnterApp = () => {
        window.location.hash = 'overview';
    };

    if (onLandingPage) {
        return <LandingPage onEnter={handleEnterApp} />;
    }

    const renderContent = () => {
        switch (activeView) {
            case 'overview': return <Overview />;
            case 'getting-started': return <GettingStarted />;
            case 'development-lifecycle': return <Lifecycle />;
            case 'architecture': return <Architecture />;
            case 'agent-core': return <AgentCore />;
            case 'communication': return <Communication />;
            case 'orchestration': return <Orchestration />;
            case 'build-pipeline': return <Deployment />;
            case 'tooling': return <Tools />;
            case 'performance-dashboard': return <AdminUI />;
            case 'component-sandbox': return <Playground systemInstruction={systemInstruction} />;
            case 'project-starters': return <SampleAgents />;
            case 'api-integration': return <ApiAccess />;
            default: return <Overview />;
        }
    };

    const MainAppLayout = (
        <div className="flex h-screen">
            <Sidebar 
                navItems={NAV_ITEMS}
                activeView={activeView}
                isMobileOpen={isSidebarOpen}
                setMobileOpen={setSidebarOpen}
            />
            
            <div className="flex flex-col flex-1">
                 <Header onMenuClick={() => setSidebarOpen(true)} clerkEnabled={clerkEnabled} />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 pt-24 md:pt-8 relative">
                    {clerkEnabled && (
                        <div className="absolute top-6 right-8 z-10 hidden md:block">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    )}
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </main>
                 <SettingsPanel 
                    isOpen={isSettingsPanelOpen}
                    setIsOpen={setSettingsPanelOpen}
                    systemInstruction={systemInstruction}
                    setSystemInstruction={setSystemInstruction}
                    supervisorInstruction={supervisorInstruction}
                    setSupervisorInstruction={setSupervisorInstruction}
                />
            </div>
        </div>
    );

    if (!clerkEnabled) {
        return MainAppLayout;
    }

    return (
        <>
            <SignedIn>
                {MainAppLayout}
            </SignedIn>
            <SignedOut>
                <SignInPage />
            </SignedOut>
        </>
    );
};

export default App;
