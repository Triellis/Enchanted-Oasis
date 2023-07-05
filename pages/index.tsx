import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, useColorMode } from "@chakra-ui/react";
export default function IndexPage() {
  const session = useSession();

  const router = useRouter();
  if (session.status === "authenticated") {
    router.push("/Dashboard/Admin");
  }
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      Not signed in <br />
      <Button colorScheme="orange" onClick={() => signIn()}>
        Sign in
      </Button>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </>
  );
}
