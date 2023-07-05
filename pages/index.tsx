import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function IndexPage() {
	const session = useSession();

	const router = useRouter();
	if (session.status === "authenticated") {
		router.push("/Dashboard/Admin");
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	);
}
