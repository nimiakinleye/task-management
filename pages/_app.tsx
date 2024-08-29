import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import { ReactElement, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className={`${inter.className}`}>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </main>
  );
}
