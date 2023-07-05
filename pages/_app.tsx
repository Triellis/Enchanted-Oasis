import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});
// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	return (
		<SessionProvider session={session}>
			<ThemeProvider theme={darkTheme}>
				<Component {...pageProps} />
				<CssBaseline />
			</ThemeProvider>
		</SessionProvider>
	);
}
