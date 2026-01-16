import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { Users, Target, CheckCircle, TrendingUp } from 'lucide-react';
import API_URL from '../api/config';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${API_URL}/leads/stats`);
                setStats(response.data);
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div style={{ color: 'var(--text-muted)' }}>Loading analytics...</div>;
    if (!stats) return <div style={{ color: 'var(--danger)' }}>Failed to load stats</div>;

    const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#3b82f6', '#ef4444'];

    const leadStatusData = stats.statusBreakdown.map(item => ({
        name: item._id,
        value: item.count
    }));

    const sourceData = stats.sourceBreakdown.map(item => ({
        name: item._id,
        value: item.count
    }));

    return (
        <div className="animate-fade">
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Real-time performance metrics</p>
            </header>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div className="glass" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Leads</span>
                        <Users size={20} color="var(--primary)" />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalLeads}</div>
                </div>
                <div className="glass" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Converted</span>
                        <CheckCircle size={20} color="var(--success)" />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {stats.statusBreakdown.find(s => s._id === 'Converted')?.count || 0}
                    </div>
                </div>
                <div className="glass" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Pipeline Value</span>
                        <TrendingUp size={20} color="var(--info)" />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ${stats.statusBreakdown.reduce((acc, curr) => acc + curr.totalValue, 0).toLocaleString()}
                    </div>
                </div>
                <div className="glass" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Conversion Rate</span>
                        <Target size={20} color="var(--warning)" />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {((stats.statusBreakdown.find(s => s._id === 'Converted')?.count || 0) / stats.totalLeads * 100).toFixed(1)}%
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="glass" style={{ padding: '1.5rem', height: '400px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Leads by Stage</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={leadStatusData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass" style={{ padding: '1.5rem', height: '400px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Leads by Source</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={sourceData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {sourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '-40px' }}>
                        {sourceData.map((entry, index) => (
                            <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span>{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
