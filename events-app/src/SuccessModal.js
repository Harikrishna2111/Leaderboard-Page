import React from "react";
import PropTypes from "prop-types";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="glass-modal-card">
        <div className="success-icon-circle">
          <span className="checkmark">L</span>
        </div>
        <h2 className="modal-title">Profile updated successfully!</h2>
        <p className="modal-text">
          Your profile information has been saved and is now up to date.
        </p>
        <button className="modal-go-back-btn-green" onClick={onClose}>
          Go back to dashboard
        </button>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessModal;
