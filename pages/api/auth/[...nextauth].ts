import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getRoleAndId, validateLogin } from "../../../lib/functions";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Email",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "test@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any, req: any) {
				// Add logic here to look up the user from the credentials supplied
				console.log(credentials);
				const user = await validateLogin(
					credentials.email,
					credentials.password
				);

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user as any;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	callbacks: {
		async session({
			session,
			token,
			user,
		}: {
			session: any;
			token: any;
			user: any;
		}) {
			// Send properties to the client, like an access_token and user id from a provider.
			const { role, id } = await getRoleAndId(session.user.email);
			session.user.id = id;
			session.user.role = role;

			return session;
		},
	},
};

export default NextAuth(authOptions);
