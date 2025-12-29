import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ProfilePage } from "./ProfilePage";
import { EditProfilePage } from "./EditProfile";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Edit Profile");

  const renderPageContent = () => {
    if (activeTab === "Edit Profile") {
      return <EditProfilePage setActiveTab={setActiveTab} />;
    }
    return <ProfilePage />;
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content-wrapper">
        <header className="main-header">
          <span className="user-name">Student Name</span>
          <span
            className="profile-icon-small clickable-icon"
            onClick={() => setActiveTab("Dashboard")}
          >
            S
          </span>
        </header>
        <main className="profile-main-area">{renderPageContent()}</main>
      </div>
    </div>
  );
}

export default App;
