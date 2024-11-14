import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import type { AppProps } from "next/app";
import { Flowbite } from "flowbite-react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Flowbite>
      <ThemeProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </Flowbite>
  );
}
