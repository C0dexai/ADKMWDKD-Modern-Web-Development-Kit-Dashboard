
import React from 'react';

export interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export interface ApiKey {
    fullKey: string;
    display: string;
    created: string;
}

export interface WorkflowStep {
    description: string;
    agentName: string;
    agentRole: string;
}

export interface SimLog {
    id: number;
    type: 'user' | 'agent' | 'thought' | 'tool' | 'tool_result' | 'error';
    text: string;
}

export interface ArchComponentData {
    title: string;
    description: string;
}