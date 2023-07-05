import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MySession } from "../lib/types";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Enchanted Oasis</title>
        <meta name="description" content="Cool! " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Yo
      <main>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>

        <div>{children}</div>
      </main>
    </>
  );
}
