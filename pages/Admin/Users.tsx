import { useSession } from "next-auth/react";
import Layout from "../Layout";
import { Button } from "@chakra-ui/react";
export default function Users() {
  const session = useSession();
  return (
    <>
      <Layout>This is a users section</Layout>
    </>
  );
}
