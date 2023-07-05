import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Button,
  useColorMode,
  Card,
  CardBody,
  CardFooter,
  Stack,
} from "@chakra-ui/react";
import styles from "./index.module.css";

export default function IndexPage() {
  const session = useSession();

  const router = useRouter();
  if (session.status === "authenticated") {
    router.push("/Dashboard/Admin");
  }
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <div className={styles.main}>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Stack>
            <CardBody>
              <h1 className={styles.heading}>
                Welcome to the
                <span className={styles.appName}> Enchanted Oasis</span>
              </h1>

              <p className={styles.txt}>
                <span>
                  Embark on a magical journey of discovery, where spells and
                  wonders await. Enter a realm of enchantment and unlock your
                  true potential. Step into the
                  <span className={styles.appNameTxt}> Enchanted Oasis </span>
                  and let the magic unfold.
                </span>
              </p>
            </CardBody>

            <CardFooter>
              <Button colorScheme="orange" onClick={() => signIn()}>
                Sign in
              </Button>
            </CardFooter>
          </Stack>

          <Image
            src="/assets/image/Trio.png"
            alt="Picture of the author"
            width={600}
            height={600}
          />
        </Card>
      </div>
    </>
  );
}
