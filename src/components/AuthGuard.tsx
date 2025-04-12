// components/AuthGuard.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/credenciais");
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    console.log("AuthGuard => loading:", loading);
    console.log("AuthGuard => isAuthenticated:", isAuthenticated);
  }, [loading, isAuthenticated]);


  if (loading) return <div className="p-4">Verificando autenticação...</div>;
  return isAuthenticated ? <>{children}</> : null;
}
