import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { RootState } from "../store/store";
const styles = {
  loginContainer: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
  },
  button: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "14px",
  },
};

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ username, password }));
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h2>
      {error && <div style={styles.error}>{error}</div>}{" "}
      <div>
        {" "}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />{" "}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />{" "}
        <button onClick={handleSubmit} style={styles.button} disabled={loading}>
          {" "}
          {loading ? "Logging in..." : "Login"}{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};
