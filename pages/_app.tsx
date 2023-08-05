import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ChakraProvider } from "@chakra-ui/react";

import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "../lib/theme";
// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
import "../styles/global.css";
import store from "@/lib/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { setIsSidebarOpen } from "@/lib/slices/isSidebarOpen";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  useEffect(() => {
    // This useEffect will be triggered only once when the app mounts
    function handleResize() {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) store.dispatch(setIsSidebarOpen(true));
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [store]);
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <GoogleAnalytics trackPageViews={true} />
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}
