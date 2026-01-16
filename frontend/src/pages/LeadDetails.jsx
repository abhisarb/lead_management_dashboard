import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Mail, Phone, Calendar, DollarSign, Tag, Info } from 'lucide-react';
import API_URL from '../api/config';

const LeadDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await axios.get(`${API_URL}/leads/${id}`);
                setLead(response.data);
            } catch (err) {
                console.error('Error fetching lead details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [id]);

    if (loading) return <div style={{ color: 'var(--text-muted)' }}>Loading lead details...</div>;
    if (!lead) return <div style={{ color: 'var(--danger)' }}>Lead not found</div>;

    return (
        <div className="animate-fade">
            <button
                onClick={() => navigate('/leads')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    marginBottom: '2rem'
                }}
            >
                <ArrowLeft size={18} />
                Back to Leads
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            {lead.name.charAt(0)}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{lead.name}</h2>
                            <span style={{
                                padding: '0.2rem 0.6rem',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                                color: 'var(--primary)',
                                border: '1px solid rgba(99, 102, 241, 0.4)'
                            }}>
                                {lead.status}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Mail size={20} color="var(--text-muted)" />
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</div>
                                <div style={{ fontWeight: '500' }}>{lead.email}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Phone size={20} color="var(--text-muted)" />
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</div>
                                <div style={{ fontWeight: '500' }}>{lead.phone}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Tag size={20} color="var(--text-muted)" />
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source</div>
                                <div style={{ fontWeight: '500' }}>{lead.source}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <DollarSign size={18} color="var(--success)" />
                            Lead Value
                        </h3>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${lead.value.toLocaleString()}</div>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={18} color="var(--info)" />
                            Dates
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Created</span>
                            <span style={{ fontSize: '0.875rem' }}>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Last Update</span>
                            <span style={{ fontSize: '0.875rem' }}>{new Date(lead.updatedAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem', flex: 1 }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Info size={18} color="var(--warning)" />
                            Internal Notes
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                            {lead.notes || 'No notes available for this lead.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetails;
