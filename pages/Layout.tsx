import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MySession } from "../lib/types";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession().data as MySession;
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Enchanted Oasis</title>
        <meta name="description" content="Cool! " />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      Yo
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            App Bar
          </Typography>
        </Toolbar>
      </AppBar>
      <main>{session?.user.role}</main>
    </>
  );
}
