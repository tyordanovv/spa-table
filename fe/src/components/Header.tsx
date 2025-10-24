import React from "react";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  buttonOutline: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#1976d2",
    border: "1px solid #1976d2",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={styles.header}>
      <h1>Table Management</h1>
      <div>
        <span style={{ marginRight: "15px" }}>Welcome, user</span>
        <button style={styles.buttonOutline} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
