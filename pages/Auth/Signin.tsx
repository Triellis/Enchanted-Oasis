import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { getCsrfToken } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

import styles from "./signin.module.css";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email
        <input
          name="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button
        onClick={async () => {
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          console.log(res);

          if (res?.status !== 200) {
            toast({
              title: "Wrong Email Or Password ",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            router.push("/");
          }
        }}
      >
        Sign in
      </button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
