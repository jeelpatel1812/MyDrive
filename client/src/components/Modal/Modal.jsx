import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>✖</button>
        {children}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
    justifyContent: "center", alignItems: "center"
  },
  modal: {
    background: "#fff", padding: "20px", borderRadius: "8px",
    minWidth: "300px", textAlign: "center", position: "relative"
  },
  closeButton: {
    position: "absolute", top: "10px", right: "10px", border: "none",
    background: "none", fontSize: "18px", cursor: "pointer"
  }
};

export default Modal;
