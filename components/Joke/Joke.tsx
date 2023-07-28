import useSWR from "swr";
import styles from "./Joke.module.css";

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
  return <button onClick={() => mutate()}>{joke}</button>;
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
