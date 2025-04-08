// context/AuthContext.tsx
"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import {
  destroyCookie,
  //  parseCookies,
  setCookie,
} from "nookies";
import "../app/globals.css";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface UserType {
  id: string;
  name: string;
  email_personal: string;
  position: string;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  loading: true,
};

export const AuthContext = createContext(defaultAuthContext as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("AuthProvider montado");
    return () => console.log("AuthProvider desmontado");
  }, []);
  //   useEffect(() => {
  //     const { 'creajr.token': token } = parseCookies()

  //     if (token) {
  //     apiService.getProfile(token).then((response) => {
  //         setUser(response.user);
  //     });
  //     }

  //   }, []);

  const login = async (email: string, password: string) => {
    alert("CHEGOU 1");
    try {
      console.log("CHEGOU 2");
      const { token, userApi } = await apiService.login(email, password);
        console.log("CHEGOU 3", { token, userApi });
      setCookie(undefined, "creajr.token", token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      setUser(userApi);
      router.push("/home");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    destroyCookie(undefined, "creajr.token");
    setUser(null);
    router.push("/credenciais");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
