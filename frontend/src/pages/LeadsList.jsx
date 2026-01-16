import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight, MoreVertical, Eye } from 'lucide-react';
import API_URL from '../api/config';

const LeadsList = () => {
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/leads`, {
                params: { page, limit: 10, search, status }
            });
            setLeads(response.data.leads);
            setTotal(response.data.total);
            setPages(response.data.pages);
        } catch (err) {
            console.error('Error fetching leads:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page, search, status]);

    const getStatusColor = (s) => {
        switch (s) {
            case 'New': return 'var(--primary)';
            case 'Contacted': return 'var(--info)';
            case 'Qualified': return 'var(--warning)';
            case 'Converted': return 'var(--success)';
            case 'Lost': return 'var(--danger)';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <div className="animate-fade">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Leads</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and track your potential customers</p>
                </div>
            </header>

            {/* Filters Bar */}
            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'rgba(15, 23, 42, 0.5)',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ position: 'relative', minWidth: '150px' }}>
                    <Filter size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'rgba(15, 23, 42, 0.5)',
                            color: 'white',
                            outline: 'none',
                            appearance: 'none'
                        }}
                    >
                        <option value="">All Statuses</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                    </select>
                </div>
            </div>

            {/* Leads Table */}
            <div className="glass" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Name</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Status</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Source</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Value</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Created At</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading leads...</td></tr>
                        ) : leads.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No leads found</td></tr>
                        ) : leads.map(lead => (
                            <tr key={lead._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="table-row-hover">
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '500' }}>{lead.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{lead.email}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        backgroundColor: `${getStatusColor(lead.status)}20`,
                                        color: getStatusColor(lead.status),
                                        border: `1px solid ${getStatusColor(lead.status)}40`
                                    }}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{lead.source}</td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>${lead.value.toLocaleString()}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => navigate(`/leads/${lead._id}`)}
                                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} leads
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--bg-card)',
                            color: page === 1 ? 'var(--text-muted)' : 'white',
                            cursor: page === 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', fontSize: '0.875rem' }}>
                        Page {page} of {pages}
                    </div>
                    <button
                        disabled={page === pages}
                        onClick={() => setPage(p => p + 1)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--bg-card)',
                            color: page === pages ? 'var(--text-muted)' : 'white',
                            cursor: page === pages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadsList;
