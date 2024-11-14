import type { AppProps } from "next/app";
import { Flowbite } from "flowbite-react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from "@/hooks/useAuth";
import LayoutWrapper from "@/components/LayoutWrapper";

import "@/styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Flowbite>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </AuthProvider>
      </QueryClientProvider>
    </Flowbite>
  );
}
