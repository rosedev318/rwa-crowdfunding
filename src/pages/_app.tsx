import type { AppProps } from "next/app";
import { Flowbite } from "flowbite-react";

import { AuthProvider } from "@/hooks/useAuth";
import AuthWrapper from "@/components/AuthWrapper";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Flowbite>
      <AuthProvider>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </AuthProvider>
    </Flowbite>
  );
}
