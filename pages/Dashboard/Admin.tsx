import { useSession } from "next-auth/react";
import Layout from "../Layout";
import { Button } from "@chakra-ui/react";
export default function Admin() {
  const session = useSession();
  return (
    <>
      <Layout>
        hello
        <h1>{session.data?.user?.name}</h1>
      </Layout>
    </>
  );
}
