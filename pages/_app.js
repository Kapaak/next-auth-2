import { SessionProvider } from "next-auth/react";
import Navigation from "../components/Navigation";

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<Navigation />
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
