import useSWR from "swr";
import styles from "./Joke.module.css";
import MotionDiv from "../MotionDiv";
import { Spinner } from "@chakra-ui/react";

function useJoke() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/getJoke",
    async (url) => {
      const res = await fetch(url);
      const data = await res.text();
      return data;
    }
  );

  return { joke: data?.replaceAll('"', ""), error, isLoading, mutate };
}

function JokeComponent({ joke, mutate }: { joke: string; mutate: any }) {
  return (
    <button onClick={() => mutate()}>
      <MotionDiv
        key={joke}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 2, ease: "easeInOut" }}
      >
        {joke}
      </MotionDiv>
    </button>
  );
}

function Loader() {
  return <Spinner color="hsl(var(--a))" />;
}

export default function Joke() {
  const { joke, error, isLoading, mutate } = useJoke();

  let componentsToRender;
  if (isLoading) {
    componentsToRender = <Loader />;
  } else if (error) {
    componentsToRender = <h1>error loading the joke {":("} </h1>;
  } else {
    componentsToRender = <JokeComponent joke={joke!} mutate={mutate} />;
  }

  return <div className={styles.joke}>{componentsToRender}</div>;
}
