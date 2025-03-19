import { NextPage } from "next";
import Image from "next/image";
import "./credentials.css";
import { useState } from "react";
import { auth } from "../../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

interface Props {}

const Credentials: NextPage<Props> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home"); // Redireciona após login
    } catch (err: any) {
      setError("Email ou senha incorretos");
      console.error("Erro ao fazer login:", err.message);
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
              <label htmlFor="">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputGroup" id="senha">
              <label htmlFor="">Senha</label>
              <input
                type="password"
                id="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Acessar</button>
          </form>
          <div className="subRow">
            <p>
              <a href="">Esqueci minha senha</a>
            </p>
            <p>
              <a href="">Desejo me cadastrar</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Credentials;
