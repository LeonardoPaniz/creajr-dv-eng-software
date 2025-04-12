// app/login/page.tsx
"use client";

import Image from "next/image";
import "./signIn.css";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext} from "../../context/AuthContext";

interface SignInPageProps {
  setCredentialOperation?: (value: number) => void;
}

export default function SignInPage({
  setCredentialOperation,
}: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { login, isAuthenticated } = useContext(AuthContext);

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError(err.message || "Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pageCredentials">
      <div className="logosContent">
        <Image
          src="/logos/logo-creajr-pr.png"
          className=""
          width={200}
          height={60}
          alt=""
        />
        <Image src="/logos/sfwpreto.png" width={140} height={100} alt="" />
      </div>
      <main>
        <div className="contentInformation">
          <h1>Área restrita</h1>
          <p>Acesso exclusivo para Eng. Software do CreaJr-PR | UTFPR-DV</p>
        </div>
        <div className="credentialsModal">
          <form onSubmit={handleLogin} className="inputDiv">
            <div className="inputGroup" id="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputGroup" id="senha">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Acessar"}
            </button>
          </form>
          <div className="subRow">
            <p>
              <a href="/forgot-password">Esqueci minha senha</a>
            </p>
            {setCredentialOperation && (
              <p>
                <a onClick={() => setCredentialOperation(1)}>
                  Desejo me cadastrar
                </a>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

