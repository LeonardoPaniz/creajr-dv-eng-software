import "../app/globals.css";
import ProtectedRoute from "../components/ProtectedRoute";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProtectedRoute>
      <Component {...pageProps} />
    </ProtectedRoute>
  );
}

export default MyApp;
