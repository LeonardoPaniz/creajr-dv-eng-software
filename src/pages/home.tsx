import { AuthProvider } from "@/context/AuthContext";
import HomePage from "../pagesComponents/home/home";
// import { Providers } from "@/components/Providers";

export default function Home() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}
