// src/Sidebar.js
import React from "react";
import PropTypes from "prop-types";

const navItems = [
  "Dashboard",
  "Leaderboards",
  "Events",
  "Achievements",
  "Connect",
  "Projects",
  "Edit Profile",
];

export const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">AI & DS Association</div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={item === activeTab ? "active" : ""}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// PropTypes validation
Sidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
