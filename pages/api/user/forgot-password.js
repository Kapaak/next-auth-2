import { nanoid } from "nanoid";
import clientPromise from "../../../lib/db";
import nodemailer from "nodemailer";

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
				id: securedTokenId,
				creator: existingUser._id,
				type: "passwordReset",
				// expireAt: new Date(Date.now() + 20 * 60 * 1000), //expire after 20min
				expireAt: new Date(Date.now() + 20 * 60 * 1000), //expire after 20min
			},
		},
		{ upsert: true } //if no token to that name is present, create it
	);

	const deleteAfterSeconds = await db
		.collection("tokens")
		.createIndex({ expireAt: 1 }, { expireAfterSeconds: 200 });

	//nodemailer setup
	let transporter = nodemailer.createTransport({
		host: process.env.EMAIL_SERVER_HOST,
		port: process.env.EMAIL_SERVER_PORT,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_SERVER_USER, // generated ethereal user
			pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	try {
		let info = await transporter.sendMail({
			from: '"Pavel Kapaak 👻" <pavel.kapaak@gmail.com>', // sender address
			to: `${email}`, // list of receivers
			subject: "Hello ✔", // Subject line
			text: "Hello world?", // plain text body
			html: `<div>
            <h1>Hello my friend!</h1>
            <p>Here is your reset password link !  ${process.env.NEXTAUTH_URL}/forgot-password?resetToken=${securedTokenId} </p>
            </br>
            <p>Have a nice day ! </p>
            </div>`, // html body
		});
	} catch (error) {
		console.log(error, "server error");
	}

	console.log(email);
	// console.log(info, "email sending");
	// console.log(changeInDatabase, "change");

	res.status(200).json({ message: "Reset password sent!" });
};

export default handler;
