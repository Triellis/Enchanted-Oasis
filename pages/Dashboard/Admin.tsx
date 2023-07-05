import { useSession } from "next-auth/react";
import Layout from "../Layout";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
export default function Admin() {
  return (
    <>
      <Layout>
        <h1>yo</h1>
        <Button onClick={() => signOut()}>Logout</Button>
      </Layout>
    </>
  );
}
