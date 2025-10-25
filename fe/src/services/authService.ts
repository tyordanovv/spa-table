import { api } from "./api";
import { LoginRequest, LoginResponse } from "../types/auth.types";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/api/auth/login", credentials);
    return response.data;
  }
};
