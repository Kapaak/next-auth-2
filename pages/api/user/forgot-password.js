import { nanoid } from "nanoid";
import clientPromise from "../../../lib/db";

export const handler = async (req, res) => {
	if (req.method !== "POST") {
		return;
	}

	const data = req.body;

	const { email } = data;

	const client = await clientPromise;

	const db = client.db();

	const existingUser = await db.collection("users").findOne({ email });

	if (!existingUser) {
		res.status(404).json({ message: "User not found." });
		return;
	}

	const securedTokenId = nanoid(32);

	const changeInDatabase = await db.collection("tokens").updateMany(
		{ email: email },
		{
			$set: {
				_id: securedTokenId,
				creator: existingUser.id,
				type: "passwordReset",
				expireAt: new Date(Date.now() + 20 * 60 * 1000), //expire after 20min
			},
		},
		{ upsert: true } //if no token to that name is present, create it
	);

	console.log(changeInDatabase, "change");

	res.status(200).json({ message: "Reset password sent!" });
};

export default handler;
