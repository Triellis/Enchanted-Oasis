import Layout from "@/pages/Layout";
import { useRouter } from "next/router";

export default function notificationsPage() {
  const router = useRouter();
  return (
    <Layout>
      <div>
        <h1>{router.query.notificationId}</h1>
      </div>
    </Layout>
  );
}
