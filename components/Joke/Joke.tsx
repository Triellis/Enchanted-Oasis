import useSWR from "swr";

function useJoke() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/getJoke",
    async (url) => {
      const res = await fetch(url);
      const data = await res.text();
      return data;
    }
  );
  return { joke: data, error, isLoading, mutate };
}

function JokeComponent({ joke }: { joke: string }) {
  return <span>{joke}</span>;
}

export default function Joke() {
  const { joke, error, isLoading, mutate } = useJoke();

  let componentsToRender;
  if (isLoading) {
    componentsToRender = <h1>loading</h1>;
  } else if (error) {
    componentsToRender = <h1>error</h1>;
  } else {
    componentsToRender = <JokeComponent joke={joke!} />;
  }

  return <div>{componentsToRender}</div>;
}
