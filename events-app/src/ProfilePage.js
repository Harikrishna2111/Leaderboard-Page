// src/ProfilePage.js
import React from "react";
import PropTypes from "prop-types"; // NEW: Import PropTypes

// Static Data based on the wireframe
const profileData = {
  name: "XXX",
  year: "3rd Year AI&DS",
  skills: ["Python", "ML", "Pytorch", "NLP", "Project Management"],
  achievements: [
    {
      title: "Winner at GDG In Campus Hackathon",
      description:
        "Led a team of four and developed a prize winning project for the Google Developer Groups which was a remarkable journey.",
    },
    {
      title: "Finalist at Smart India Hackathon",
      description:
        "Led a team of four and developed a prize winning project for the Smart India Hackathon which was a remarkable journey.",
    },
  ],
};

const SkillTag = ({ skill }) => <span className="skill-tag">{skill}</span>;

// NEW: PropTypes validation for SkillTag
SkillTag.propTypes = {
  skill: PropTypes.string.isRequired,
};

export const ProfilePage = () => {
  return (
    <div className="profile-page-container">
      {/* 1. Profile Info Card */}
      <div className="profile-info-card">
        <div className="profile-icon-large">
          {/* Placeholder for Profile Icon */}
          <img src="user-icon.png" alt="Profile" />
        </div>
        <h2>{profileData.name}</h2>
        <p>{profileData.year}</p>
      </div>

      {/* 2. Bio & Skills Card */}
      <div className="profile-section-card">
        <h3 className="section-title">Bio</h3>
        <p className="bio-placeholder">
          {/* Placeholder lines for Bio */}
          <hr className="bio-line" />
          <hr className="bio-line" />
        </p>

        <h3 className="section-title">Skills</h3>
        <div className="skills-container">
          {profileData.skills.map((skill, index) => (
            <SkillTag key={index} skill={skill} />
          ))}
        </div>
      </div>

      {/* 3. Achievements Card */}
      <div className="profile-section-card">
        <h3 className="section-title">Achievements</h3>
        <div className="achievements-container">
          {profileData.achievements.map((achievement, index) => (
            <div key={index} className="achievement-item">
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
