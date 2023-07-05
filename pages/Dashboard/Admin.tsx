import { useSession } from "next-auth/react";
import Layout from "../Layout";
export default function Admin() {
	const { data: session } = useSession();
	console.log(session?.user);
	return (
		<>
			<Layout>
				<h1>Admin</h1>
			</Layout>
		</>
	);
}
