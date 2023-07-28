import NotifList from "@/components/NotifList";
import Layout from "../Layout";
import Joke from "@/components/Joke/Joke";

export default function Dashboard() {
  return (
    <Layout>
      <Joke />
      <NotifList />
    </Layout>
  );
}
