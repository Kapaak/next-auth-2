import { getSession } from "next-auth/react";

import { hashPassword, verifyPassword } from "../../../utils/auth";
import clientPromise from "../../../lib/db";

async function handler(req, res) {
	if (req.method !== "PATCH") {
		return;
	}

	const data = req.body;

	const { oldPassword, newPassword } = data;

	const session = await getSession({ req });

	if (!session) {
		res.status(401).json({ message: "Not authenticated!" });
		return;
	}

	const userEmail = session.user.email;

	const client = await clientPromise;

	const db = client.db().collection("users");

	const existingUser = await db.findOne({ email: userEmail });

	if (!existingUser) {
		res.status(404).json({ message: "User not found." });
		// client.close();
		return;
	}

	const currentPassword = existingUser.password;

	const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

	if (!passwordsAreEqual) {
		res.status(403).json({ message: "Invalid password." });
		// client.close();
		return;
	}

	const hashedPassword = await hashPassword(newPassword);

	const result = await db.updateOne(
		{ email: userEmail },
		{ $set: { password: hashedPassword } }
	);

	// client.close();
	res.status(200).json({ message: "Password updated!" });
}

export default handler;
