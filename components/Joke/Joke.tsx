import useSWR from "swr";
import styles from "./Joke.module.css";
import MotionDiv from "../MotionDiv";

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        {joke}
      </MotionDiv>
    </button>
  );
}

export default function Joke() {
  const { joke, error, isLoading, mutate } = useJoke();

  let componentsToRender;
  if (isLoading) {
    componentsToRender = <h1>loading</h1>;
  } else if (error) {
    componentsToRender = <h1>error</h1>;
  } else {
    componentsToRender = <JokeComponent joke={joke!} mutate={mutate} />;
  }

  return <div className={styles.joke}>{componentsToRender}</div>;
}
