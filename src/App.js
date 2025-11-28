import React, { useState } from 'react';
import { EnigmaLeaderboard, GenesisLeaderboard } from './Leaderboard';
import './App.css';

function App() {
    const [activeLeaderboard, setActiveLeaderboard] = useState('enigma');
    const [activeEnigmaTab, setActiveEnigmaTab] = useState('first_years');

    const renderLeaderboardContent = () => {
        if (activeLeaderboard === 'enigma') {
            // Pass the sub-state and setter down to EnigmaLeaderboard
            return (
                <EnigmaLeaderboard
                    activeSubTab={activeEnigmaTab}
                    setActiveSubTab={setActiveEnigmaTab}
                />
            );
        }
        return <GenesisLeaderboard />;
    };

    return (
        <div className="app-container">
            <div className="main-content">
                <header className="main-header">
                    <h1>Leaderboard</h1>
                    <div className="leaderboard-tabs">
                        {/* Main Tabs */}
                        <button
                            className={activeLeaderboard === 'enigma' ? 'active-tab' : ''}
                            onClick={() => setActiveLeaderboard('enigma')}
                        >
                            Enigma
                        </button>
                        <button
                            className={activeLeaderboard === 'genesis' ? 'active-tab' : ''}
                            onClick={() => setActiveLeaderboard('genesis')}
                        >
                            Genesis
                        </button>
                    </div>
                </header>

                <div className="leaderboard-display">
                    {renderLeaderboardContent()}
                </div>
            </div>
        </div>
    );
}

export default App;