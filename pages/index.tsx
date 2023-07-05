import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function IndexPage() {
<<<<<<< HEAD
  const { data: session } = useSession();
  const router = useRouter();
  if (session && session.user) {
    router.push("/Dashboard/Admin");
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
=======
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
>>>>>>> e35c918405f95f89803f5af5502816a409c3f562
}
