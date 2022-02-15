import { hashPassword } from "../../../utils/auth";

import clientPromise from "../../../lib/db";

const handler = async (req, res) => {
	const data = req.body;
	const { username, email, password } = data;

	if (
		!email ||
		!email.includes("@") ||
		!password ||
		password.trim().length < 7
	) {
		res.status(422).json({
			message:
				"Invalid input - password should also be at least 7 characters long.",
		});
		return;
	}

	const client = await clientPromise;

	const db = client.db();

	const existingUser = await db.collection("users").findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ message: "User exists already!" });
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(password);

	const result = await db.collection("users").insertOne({
		email: email,
		password: hashedPassword,
		name: username,
	});

	res.json({ message: "Created user!" });
};

export default handler;
