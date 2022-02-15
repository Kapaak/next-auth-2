import { getSession } from "next-auth/react";

import { hashPassword, verifyPassword } from "../../../utils/auth";
import clientPromise from "../../../lib/db";

const handler = async (req, res) => {
	if (req.method !== "PATCH") {
		return;
	}

	const data = req.body;

	const { description } = data;

	const session = await getSession({ req });

	if (!session) {
		res.status(401).json({ message: "Not authenticated!" });
		return;
	}

	const email = session.user.email;

	const client = await clientPromise;

	const db = client.db().collection("users");

	const existingUser = await db.findOne({ email });

	if (!existingUser) {
		res.status(404).json({ message: "User not found." });
		return;
	}

	const changeInDatabase = await db.updateOne(
		{ email: email }, // Query for the user object of the logged in user
		{ $set: { description: description } } //change description value
	);
	console.log(changeInDatabase, "serverside chagne");

	// client.close();
	res.status(200).json({ message: "Password updated!" });
};

export default handler;
