// src/pages/credenciais.tsx
import { useContext, useState } from "react";
import SignInPage from "../pagesComponents/signIn/signIn";
import SignUpPage from "../pagesComponents/signUp/signUp";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {AuthContext, AuthProvider} from "../context/AuthContext";

export default function Credenciais() {
  const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();
  const [credentialOperation, setCredentialOperation] = useState(0);

    useEffect(() => {
      console.log("Credenciais => isAuthenticated:", isAuthenticated);
      
      if (isAuthenticated) {
        router.push("/home");
      }
    }, [isAuthenticated, router]);

  return (
    <>
    <AuthProvider>
      {credentialOperation ? (
        <SignUpPage setCredentialOperation={setCredentialOperation} />
      ) : (
        <SignInPage setCredentialOperation={setCredentialOperation} />
      )}
    </AuthProvider>
    </>
  );
}
