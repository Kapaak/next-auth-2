import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import clientPromise from "../../../lib/db";

import { verifyPassword } from "../../../utils/auth";

export default NextAuth({
	secret: process.env.SECRET,
	session: {
		jwt: true,
	},
	// pages: {
	// 	signIn: "/sign-in",
	// },
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				// console.log(credentials, "kredenc");
				const client = await clientPromise;

				const usersCollection = client.db().collection("users");

				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				if (!user) {
					console.log("user not found");
					throw new Error("No user found!");
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					console.log("bad password");
					throw new Error("Wrong password!");
				}

				return { email: user.email, name: user.name };
			},
		}),
	],
});
