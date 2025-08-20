
import React from 'react';
import { NavItem } from './types.ts';

const SidebarIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {children}
    </svg>
);

export const NAV_ITEMS: NavItem[] = [
    { 
        id: 'overview', 
        label: 'Overview', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></SidebarIcon> 
    },
    { 
        id: 'getting-started', 
        label: 'Getting Started', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></SidebarIcon> 
    },
    { 
        id: 'development-lifecycle', 
        label: 'Development Lifecycle', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></SidebarIcon> 
    },
    { 
        id: 'architecture', 
        label: 'System Architecture', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></SidebarIcon> 
    },
    { 
        id: 'agent-core', 
        label: 'Agent Anatomy', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></SidebarIcon>
    },
    { 
        id: 'orchestration', 
        label: 'Orchestration', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" /></SidebarIcon>
    },
     { 
        id: 'communication', 
        label: 'Communication Layer', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></SidebarIcon> 
    },
    { 
        id: 'build-pipeline', 
        label: 'Build & Deployment', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></SidebarIcon> 
    },
    { 
        id: 'tooling', 
        label: 'Tooling & Ecosystem', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></SidebarIcon> 
    },
    { 
        id: 'performance-dashboard', 
        label: 'Admin Dashboard', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></SidebarIcon> 
    },
    { 
        id: 'component-sandbox', 
        label: 'Live Playground', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></SidebarIcon> 
    },
    { 
        id: 'project-starters', 
        label: 'Sample Agents', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5.438c-.84 0-1.543.54-1.838 1.353l-1.3 3.468c-.16.42.06.896.48 1.074l.46.183c.42.16 1.002.06 1.28-.36l.42-.63c.28-.42.86-.52 1.28-.36l.46.183c.42.16.64.654.48 1.074l-1.3 3.468C5.98 19.46 6.68 20 7.52 20H19a2 2 0 002-2v-6a2 2 0 00-2-2z" /></SidebarIcon> 
    },
    { 
        id: 'api-integration', 
        label: 'API Reference', 
        icon: <SidebarIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></SidebarIcon> 
    },
];

export const DEFAULT_SYSTEM_INSTRUCTION = `You are the primary System Orchestrator for the "Advanced Agent Development Kit" (ADK). Your core function is to receive user requests, break them down into a logical, step-by-step execution plan, and then provide a final, comprehensive response. Your output MUST be structured, clear, and demonstrate advanced reasoning. Always start by acknowledging the user's goal, then present your plan, and finally, execute the plan to deliver the result. You do not have access to live tools in this playground, so simulate their execution in your response.`;

export const DEFAULT_SUPERVISOR_INSTRUCTION = `You are the AI Supervisor. Your role is to provide meta-level analysis and guidance. When given a prompt or a scenario, you do not execute the task directly. Instead, you analyze the request and provide strategic advice, identify potential risks or edge cases, suggest alternative approaches, or critique a proposed plan. Your goal is to ensure the primary agents are acting efficiently, safely, and aligned with best practices. Think like a senior architect reviewing a junior developer's plan.`;