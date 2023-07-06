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
import { MySession } from "../lib/types";

export default function IndexPage() {
  const session = useSession();
  const sessionData = session.data as MySession;

  const router = useRouter();
  if (session.status === "authenticated") {
    router.push(`${sessionData?.user?.role}/Dashboard`);
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
            <div className={styles.imageBodyWrapper}>
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
              <div className={styles.imageWrapper}>
                <Image
                  src="/assets/image/Trio.png"
                  alt="Picture of the author"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <CardFooter>
              <Button size={"lg"} colorScheme="orange" onClick={() => signIn()}>
                Sign in
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </div>
    </>
  );
}
