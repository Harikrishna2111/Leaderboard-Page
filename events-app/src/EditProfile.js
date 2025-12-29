import React, { useState } from "react";
import PropTypes from "prop-types";
import SuccessModal from "./SuccessModal";

const RemovableSkillTag = ({ skill, onRemove }) => (
  <span className="skill-tag removable-tag">
    {skill}
    <span className="remove-btn" onClick={() => onRemove(skill)}>
      X
    </span>
  </span>
);

RemovableSkillTag.propTypes = {
  skill: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const ProfilePicturePage = ({ onBackToEditForm }) => (
  <div className="profile-picture-page">
    <h3>Edit Profile Picture</h3>
    <p>Upload and manage your profile image.</p>
    <div className="current-image-preview">Current Picture</div>
    <input type="file" accept="image/*" />
    <button
      className="submit-profile-btn"
      style={{ maxWidth: "200px", marginTop: "20px" }}
    >
      Upload & Save
    </button>
    <button className="back-btn" onClick={onBackToEditForm}>
      ← Back to Edit Profile
    </button>
  </div>
);

ProfilePicturePage.propTypes = {
  onBackToEditForm: PropTypes.func.isRequired,
};

export const EditProfilePage = ({ setActiveTab }) => {
  const [skills, setSkills] = useState([
    "Python",
    "React",
    "TensorFlow",
    "SQL",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveSkill = (skillToRemove) =>
    setSkills(skills.filter((s) => s !== skillToRemove));

  const handleAddSkill = (e) => {
    if (
      e.key === "Enter" &&
      newSkill.trim() &&
      !skills.includes(newSkill.trim())
    ) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  if (isEditingPicture) {
    return (
      <ProfilePicturePage onBackToEditForm={() => setIsEditingPicture(false)} />
    );
  }

  return (
    <div className="profile-edit-container">
      <h2 className="edit-title">Edit Profile</h2>

      <div className="edit-card profile-info-card-edit">
        <div
          className="profile-icon-edit clickable-icon"
          onClick={() => setIsEditingPicture(true)}
        >
          <img src="user-icon.png" alt="Profile" />
        </div>
        <div className="profile-fields">
          <input
            type="text"
            defaultValue="Student Name"
            className="name-input"
          />
          <input
            type="text"
            defaultValue="3rd Year AI&DS"
            className="year-input"
          />
        </div>
      </div>

      <div className="edit-card profile-bio-skills-card">
        <h3 className="section-title">Bio and Top Skills</h3>
        <textarea
          rows="4"
          className="bio-textarea"
          defaultValue="Passionate about Machine Learning..."
        ></textarea>
        <div className="skills-input-container">
          {skills.map((skill) => (
            <RemovableSkillTag
              key={skill}
              skill={skill}
              onRemove={handleRemoveSkill}
            />
          ))}
          <input
            type="text"
            placeholder="Add more skills..."
            className="add-skill-input"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleAddSkill}
          />
        </div>
      </div>

      <div className="edit-card profile-achievements-card">
        <h3 className="section-title">Achievements</h3>
        <button className="add-more-btn">Add More</button>
      </div>

      <button
        className="submit-profile-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Submit Profile
      </button>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveTab("Dashboard");
        }}
      />
    </div>
  );
};

EditProfilePage.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};
