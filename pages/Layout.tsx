import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MySession } from "../lib/types";

export default function Layout({ children }: { children: React.ReactNode }) {
	const session = useSession();

	const router = useRouter();
	if (session.status === "unauthenticated") {
		router.push("/");
	}
	return (
		<>
			<Head>
				<title>Enchanted Oasis</title>
				<meta name="description" content="Cool! " />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			Yo
			<main>
				<div>{children}</div>
			</main>
		</>
	);
}
