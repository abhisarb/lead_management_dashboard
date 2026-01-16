import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
    return (
        <aside className="sidebar glass" style={{
            width: '260px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            margin: '0',
            borderRadius: '0',
            borderRight: '1px solid var(--border)'
        }}>
            <div className="logo" style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '2rem',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)', borderRadius: '8px' }}></div>
                LeadFlow
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                        backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        transition: 'all 0.2s'
                    })}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/leads"
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                        backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        transition: 'all 0.2s'
                    })}
                >
                    <Users size={20} />
                    Leads
                </NavLink>
            </nav>

            <button
                onClick={onLogout}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    marginTop: 'auto'
                }}
            >
                <LogOut size={20} />
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;
