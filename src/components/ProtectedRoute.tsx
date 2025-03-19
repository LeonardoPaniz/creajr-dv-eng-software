import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        setLoading(false); // 🔹 Atualiza o estado antes de redirecionar
        router.replace("/credentials");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 🔹 Adicionado para evitar que o usuário veja "Carregando..." indefinidamente na tela de login
  if (loading) return <p>Carregando...</p>;

  return <>{children}</>;
};

export default ProtectedRoute;
