import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function IndexPage() {
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
}
