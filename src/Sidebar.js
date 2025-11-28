import React from 'react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>AI & DS Association</h2>
                <div className="profile-icon">
                    <span className="icon">👤</span> XXX
                </div>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>Dashboard</li>
                    <li className="active">Leaderboard</li>
                    <ul>
                        <li
                            // Clicking these items changes the state in App.js
                            className={activeTab === 'enigma' ? 'sub-active' : ''}
                            onClick={() => setActiveTab('enigma')}
                        >
                            Enigma
                        </li>
                        <li
                            className={activeTab === 'genesis' ? 'sub-active' : ''}
                            onClick={() => setActiveTab('genesis')}
                        >
                            Genesis
                        </li>
                    </ul>
                    <li>Events</li>
                    <li>Achievements</li>
                    <li>Connect</li>
                    <li>Projects</li>
                    <li>Edit Profile</li>
                </ul>
            </nav>
        </div>
    );
};