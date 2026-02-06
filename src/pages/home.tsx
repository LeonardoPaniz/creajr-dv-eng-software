// import Sidebar from "@/components/menu/sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "../pagesComponents/home/home";

export default function Home() {
  return (
    <AuthProvider>
      <AppLayout>
        <HomePage />
      </AppLayout>
    </AuthProvider>
  );
}
