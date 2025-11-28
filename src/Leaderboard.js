// src/Leaderboards.js
import React, { useState } from 'react';
import { enigmaData } from './enigmaData';

// Helper function to process and rank the data
const processLeaderboard = (data) => {
    // 1. Sort by score (descending)
    const sortedData = [...data].sort((a, b) => b.score - a.score);

    // 2. Assign rank and format fields
    return sortedData.map((item, index) => ({
        ...item,
        rank: index + 1,
        yearDisplay: (item.year === 1) ? 'I' :
            (item.year === 2) ? 'II' :
                (item.year === 3) ? 'III' :
                    (item.year === 4) ? 'IV' : item.year,
        timeDisplay: item.time === 0 ? '00:00:00' : item.time,
    }));
};

// Process the imported JSON data for the 'First Years' sub-tab
const processedFirstYearData = processLeaderboard(enigmaData["enigma-first-year"].placements);

// Process the imported JSON data for the 'Non First Years' sub-tab directly (no filter)
const processedNonFirstYearData = processLeaderboard(enigmaData["enigma-non-first-year"].placements);


// --- Enigma Leaderboard Component (with Sub-Tabs) ---
export const EnigmaLeaderboard = ({ activeSubTab, setActiveSubTab }) => {

    const currentLeaderboard = activeSubTab === 'first_years' ? processedFirstYearData : processedNonFirstYearData;

    // Use JSON data for Codenigma Winners sidebar
    const codenigmaWinners = enigmaData.codenigma.placements.map(p => `${p.name} (${p.year} Year)`);
    const organizers = ['XXX (III Year)', 'YYY (II Year)', 'ZZZ (I Year)'];

    return (
        <div className="leaderboard-content">
            <div className="leaderboard-table-container">

                {/* Sub-Navigation Buttons */}
                <div className="leaderboard-sub-tabs">
                    <button
                        className={activeSubTab === 'first_years' ? 'active-tab' : ''}
                        onClick={() => setActiveSubTab('first_years')}
                    >
                        First Years
                    </button>
                    <button
                        className={activeSubTab === 'non_first_years' ? 'active-tab' : ''}
                        onClick={() => setActiveSubTab('non_first_years')}
                    >
                        Non First Years
                    </button>
                </div>

                {/* Table Display */}
                <table>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentLeaderboard.map((row) => (
                        <tr key={row.roll}>
                            <td>{row.rank}</td>
                            <td>{row.name}</td>
                            <td>{row.yearDisplay}</td>
                            <td>{row.score}</td>
                            <td>{row.timeDisplay}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="sidebar-widgets">
                <div className="codenigma-winners-box">
                    <h3>Codenigma Winners</h3>
                    <ol style={{ listStyleType: 'none', padding: 0 }}>
                        {codenigmaWinners.map((winner, index) => (
                            <li key={index}>{winner}</li>
                        ))}
                    </ol>
                </div>
                <div className="organizers-box">
                    <h3>Organizers</h3>
                    {organizers.map((organizer, index) => (
                        <p key={index}>{organizer}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Genesis Leaderboard Component (with Team Lead Column and Hover) ---
export const GenesisLeaderboard = () => {
    const [hoveredLead, setHoveredLead] = useState(null);

    // STATIC DATA for Genesis (as requested)
    const leaderboardData = [
        {
            rank: 1,
            projectName: 'AAA',
            year: 'II',
            team: '--',
            lead: 'Alex Johnson',
            members: ['Maria Santos', 'Ben Chen', 'Samar Khan']
        },
        {
            rank: 2,
            projectName: 'BBB',
            year: 'II',
            team: '--',
            lead: 'Rahul Sharma',
            members: ['Priya Nair', 'Wei Li', 'David Lee']
        },
        {
            rank: 3,
            projectName: 'CCC',
            year: 'II',
            team: '--',
            lead: 'Elena Rodriguez',
            members: ['Omar Hassan', 'Emily Brown', 'Aisha Ali']
        },
    ];

    const organizers = ['XXX (III Year)', 'YYY (II Year)', 'ZZZ (I Year)'];

    return (
        <div className="leaderboard-content">
            <div className="leaderboard-table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Project Name</th>
                        <th>Year</th>
                        <th>Team</th>
                        <th>Team Lead</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaderboardData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.rank}</td>
                            <td>{row.projectName}</td>
                            <td>{row.year}</td>
                            <td>{row.team}</td>

                            {/* Team Lead Cell with Hover Handlers */}
                            <td
                                onMouseEnter={() => setHoveredLead(row)}
                                onMouseLeave={() => setHoveredLead(null)}
                                className="tooltip-container"
                            >
                                {row.lead}

                                {/* Tooltip/Cloud Message */}
                                {hoveredLead && hoveredLead.rank === row.rank && (
                                    <div className="team-tooltip">
                                        <p><strong>Team Members:</strong></p>
                                        <ul>
                                            {hoveredLead.members.map((member, i) => (
                                                <li key={i}>{member}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="organizers-box-genesis">
                <h3>Organizers</h3>
                {organizers.map((organizer, index) => (
                    <p key={index}>{organizer}</p>
                ))}
            </div>
        </div>
    );
};