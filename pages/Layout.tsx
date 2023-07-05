import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();
	const router = useRouter();
	if (!session) {
		router.push("/");
	}
	return (
		<>
			<Head>
				<title>NextAuth</title>
				<meta name="description" content="NextAuth" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>{children}</main>
		</>
	);
}
