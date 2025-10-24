import React, { useEffect } from "react";
import { Header } from "./components/Header";
import { InputSection } from "./components/InputSelection";
import { DataTable } from "./components/DataTable";
import { loginSuccessFromStorage } from "./store/slices/authSlice";
import { tokenService } from "./services/tokenService";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { LoginForm } from "./components/LoginForm";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = tokenService.getToken();
    if (token) {
      dispatch(
        loginSuccessFromStorage({
          token,
        }),
      );
    }
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <LoginForm />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Header />
        <InputSection />
        <DataTable />
      </div>
    </div>
  );
};

export default App;
