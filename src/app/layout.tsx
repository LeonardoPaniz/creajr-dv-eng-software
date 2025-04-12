// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";

import { Providers } from "../components/Providers";

export const metadata: Metadata = {
  title: "CreaJr Dois Vizinhos",
  description: "Clube de membros do creaJr DV.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
