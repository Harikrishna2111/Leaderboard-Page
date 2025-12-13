import React, { useEffect, useState } from "react";

const DEMO_USER = "Demo User";

const SkillTag = ({ skill }) => <span className="skill-tag">{skill}</span>;

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(
          `http://localhost:4000/profile/${encodeURIComponent(DEMO_USER)}`
        );
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  if (loading) return <p>Loading profile…</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="profile-page-container">
      {/* 1. Profile Info Card */}
      <div className="profile-info-card">
        <div className="profile-icon-large">
          <img src="user-icon.png" alt="Profile" />
        </div>
        <h2>{profile.name}</h2>
        <p>{profile.year}</p>
      </div>

      {/* 2. Bio & Skills Card */}
      <div className="profile-section-card">
        <h3 className="section-title">Bio</h3>
        <p>{profile.bio || "—"}</p>

        <h3 className="section-title">Skills</h3>
        <div className="skills-container">
          {(profile.skills || []).map((skill, i) => (
            <SkillTag key={i} skill={skill} />
          ))}
        </div>
      </div>

      {/* 3. Achievements Card */}
      <div className="profile-section-card">
        <h3 className="section-title">Achievements</h3>
        <div className="achievements-container">
          {(profile.achievements || []).map((a, i) => (
            <div key={i} className="achievement-item">
              <h4>{a.title}</h4>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
