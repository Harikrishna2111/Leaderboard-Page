// src/App.js
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ProfilePage } from "./ProfilePage";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Edit Profile");

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-content-wrapper">
        {/* Header at the top right */}
        <header className="main-header">
          <span className="user-name">{"XXX"}</span>
          <span className="profile-icon-small">{"XXX"}</span>
        </header>

        {/* Main Content Area */}
        <main className="profile-main-area">
          <ProfilePage />
        </main>
      </div>
    </div>
  );
}

export default App;
