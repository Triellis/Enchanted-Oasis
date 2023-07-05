import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
	const { data: session } = useSession();
	console.log(session?.expires);
	if (session && session.user) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<Image
					src={session.user.image!}
					width={150}
					height={150}
					alt="user"
				/>
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	);
}
