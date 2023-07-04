"use client";

import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
	return (
		<main className={styles.main}>
			<Button variant="outlined">Hello World</Button>
		</main>
	);
}
