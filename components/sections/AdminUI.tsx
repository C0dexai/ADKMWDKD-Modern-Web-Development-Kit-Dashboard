import React, { useRef } from 'react';
import useChart from '../../hooks/useChart.ts';
import type { ChartConfiguration } from 'chart.js';

const StatCard = ({ title, value, change, icon, color }: { title: string, value: string, change: string, icon: React.ReactNode, color: string }) => (
    <div className="semi-transparent-card p-4" style={{ '--glow-color': color } as React.CSSProperties}>
        <div className="flex items-center">
            <div className={`p-3 rounded-lg mr-4`} style={{ backgroundColor: `${color}1A`, border: `1px solid ${color}33` }}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">{change}</p>
    </div>
);

const LogEntry = ({ type, text, time }: { type: 'INFO'|'WARN'|'ERROR'|'SUCCESS', text: string, time: string }) => {
    const colors = {
        'INFO': 'text-blue-400',
        'WARN': 'text-yellow-400',
        'ERROR': 'text-red-400',
        'SUCCESS': 'text-green-400'
    };
    return (
        <div className="flex items-start text-sm py-2 border-b border-gray-800">
            <span className="w-24 text-gray-500">{time}</span>
            <span className={`w-16 font-bold ${colors[type]}`}>[{type}]</span>
            <span className="flex-1 font-mono text-gray-300">{text}</span>
        </div>
    );
};

const AdminUI: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    const chartConfig: ChartConfiguration = {
        type: 'line',
        data: {
            labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            datasets: [
                {
                    label: 'Total Tasks',
                    data: [65, 59, 80, 81, 56, 55, 90],
                    borderColor: 'var(--neon-purple)',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Failed Tasks',
                    data: [5, 2, 4, 3, 6, 3, 1],
                    borderColor: 'var(--neon-pink)',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    fill: true,
                    tension: 0.4,
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#d1d5db' } } },
            scales: {
                y: { ticks: { color: '#d1d5db' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#d1d5db' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        },
    };

    useChart(chartRef, chartConfig);

    return (
        <section id="admin-ui" className="fade-in space-y-8">
             <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                    Admin Dashboard
                </h2>
                <p className="text-lg text-gray-300">A centralized command center for monitoring, managing, and debugging your entire agent workforce. This is a static representation of the live dashboard's capabilities.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Active Agents" value="7" change="2 new since last hour" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} color="var(--neon-blue)" />
                <StatCard title="Tasks Processed (24h)" value="1,284" change="+12% vs yesterday" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="var(--neon-green)" />
                <StatCard title="Avg. Task Time" value="12.3s" change="-8% vs last week" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="var(--neon-purple)" />
                <StatCard title="Errors (24h)" value="15" change="+3% vs yesterday" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} color="var(--neon-pink)" />
            </div>

            {/* Chart and Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 semi-transparent-card" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                    <h3 className="text-xl font-bold mb-4">Task Volume (Last 6 Hours)</h3>
                    <div className="h-80"><canvas ref={chartRef}></canvas></div>
                </div>
                 <div className="p-6 semi-transparent-card" style={{'--glow-color': 'var(--neon-blue)'} as React.CSSProperties}>
                    <h3 className="text-xl font-bold mb-4">Active Agents</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-sm"><span>research-agent-01</span> <span className="text-green-400 font-semibold">Idle</span></li>
                        <li className="flex justify-between items-center text-sm"><span>writer-agent-03</span> <span className="text-blue-400 font-semibold animate-pulse">Thinking...</span></li>
                        <li className="flex justify-between items-center text-sm"><span>db-query-agent-02</span> <span className="text-green-400 font-semibold">Idle</span></li>
                        <li className="flex justify-between items-center text-sm"><span>github-monitor-01</span> <span className="text-green-400 font-semibold">Idle</span></li>
                        <li className="flex justify-between items-center text-sm"><span>support-triage-05</span> <span className="text-yellow-400 font-semibold">Waiting</span></li>
                         <li className="flex justify-between items-center text-sm"><span>support-triage-06</span> <span className="text-red-500 font-semibold">Error</span></li>
                    </ul>
                </div>
            </div>

            {/* Live Logs */}
            <div className="p-6 semi-transparent-card" style={{'--glow-color': 'var(--neon-green)'} as React.CSSProperties}>
                <h3 className="text-xl font-bold mb-4">Live System Logs</h3>
                <div className="font-mono text-xs max-h-80 overflow-y-auto">
                    <LogEntry time="18:01:05" type="INFO" text="[Orchestrator] Task task-xyz-123 assigned to research-agent-01" />
                    <LogEntry time="18:01:06" type="INFO" text="[research-agent-01] Starting task. Using tool: WebSearch" />
                    <LogEntry time="18:01:08" type="SUCCESS" text="[research-agent-01] WebSearch successful. Found 3 sources." />
                    <LogEntry time="18:01:09" type="INFO" text="[Orchestrator] Task task-xyz-123 updated. Passing results to writer-agent-03." />
                    <LogEntry time="18:01:10" type="WARN" text="[db-query-agent-02] Connection to analytics DB is slow." />
                    <LogEntry time="18:01:12" type="INFO" text="[writer-agent-03] Starting task. Generating draft..." />
                    <LogEntry time="18:01:15" type="ERROR" text="[support-triage-06] Failed to process incoming email. Invalid format." />
                </div>
            </div>
        </section>
    );
};

export default AdminUI;