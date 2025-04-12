// app/services/api.ts
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const { "creajr.token": token } = parseCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        if (typeof window !== "undefined") {
          destroyCookie(undefined, "creajr.token");
          window.location.href = "/credencias?session_expired=true";
        }
      }

      const errorMessage =
        error.response.data?.message || error.message || "Erro na requisição";
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  }
);

// 4. Métodos do serviço
export const apiService = {
  async login(email: string, password: string) {
    console.log("BUCETA", { email, password });
    const response = await api.post("/auth/login", { email, password });
    console.log("MILHO:", response.data);

    return response.data;
  },

  async getProfile(id: string) {
    const response = await api.get(`/auth/profile/${id}`);
    console.log("getProfile", response.data);
    
    return response.data;
  },

  async checkEmail(email: string): Promise<boolean> {
    try {
      const response = await api.get(
        `/member/email/${encodeURIComponent(email)}`
      );
      // GAMBIARRA , Favor modificar
      return response.status !== 202; // Se for 202, retorna false (email disponível); senão, retorna true (email já existe)
    } catch (error) {
      throw error; // Lança outros erros normalmente
    }
  },

  async registerMember(memberData: any) {
    const payload = {
      ...memberData,
      birth_date: new Date(memberData.birth_date).toISOString(),
      admission_date: new Date(memberData.admission_date).toISOString(),
      sponsor: memberData.sponsor || null,
    };

    const response = await api.post("/member", payload);
    return response.data;
  },

  async validateToken(token: string) {
    try {
      await api.get("/auth/validate-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { valid: true };
    } catch (err) {
      return { valid: false };
    }
  },

  logout() {
    if (typeof window !== "undefined") {
      destroyCookie(undefined, "creajr.token");
      delete api.defaults.headers.Authorization;
    }
  },
};

export { api };
