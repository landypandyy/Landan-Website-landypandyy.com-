import "../styles/globals.css";
import Script from "next/script";
import AppLayout from "../components/AppLayout/AppLayout";
import React, { useState } from "react";
import { StateContext } from "../lib/context";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { theme } from "../styles/constants";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyApp = ({ Component, pageProps }) => {
  const [feedView, setFeedView] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [currentIdInView, setCurrentIdInView] = useState(0);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <StateContext>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script id="google-analytics-config" strategy="lazyOnload">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
        </Script>
        <Toaster position="bottom-right" reverseOrder={false} />
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <ThemeProvider theme={theme}>
            <AppLayout
              feedView={{
                feedViewProp: feedView,
                setFeedViewProp: setFeedView,
              }}
              currentSection={{ currentSection, setCurrentSection }}
            >
              <Component
                {...pageProps}
                feedView={{
                  feedViewProp: feedView,
                  setFeedViewProp: setFeedView,
                }}
                currentId={{ currentIdInView, setCurrentIdInView }}
              />
            </AppLayout>
          </ThemeProvider>
        </StyleSheetManager>
      </StateContext>
    </QueryClientProvider>
  );
};

export default MyApp;
