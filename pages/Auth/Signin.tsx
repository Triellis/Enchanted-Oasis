import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { getCsrfToken } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import styles from "./Signin.module.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    // main container of the form
    <div className={styles.container}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      {/* text input part */}
      <div className={styles.fillForm}>
        <label>
          <p>Email</p>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputGroup>
        </label>
        <label>
          <p>Password</p>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputRightElement width="3rem">
              <Button size="sm" onClick={handleClick} className={styles.clicky}>
                {!show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </label>

        {/* end button part */}
        <div className={styles.submitBtn}>
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
      </div>
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
