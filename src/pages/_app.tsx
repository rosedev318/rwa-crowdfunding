import { AuthProvider } from "@/hooks/useAuth";
import type { AppProps } from "next/app";
import { Flowbite } from "flowbite-react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Flowbite>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Flowbite>
  );
}
