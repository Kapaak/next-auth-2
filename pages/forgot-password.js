import axios from "axios";
import React, { useRef } from "react";
import clientPromise from "../lib/db";

const ForgotPassword = ({ email }) => {
	const emailRef = useRef(null);

	const handleForgottenPassword = async e => {
		e.preventDefault();
		const enteredEmail = emailRef.current.value;
		try {
			const request = await axios.post("/api/user/forgot-password", {
				email: enteredEmail,
			});
			console.log(request, "client req");
		} catch (error) {
			console.log(error, "client error");
		}
	};

	return (
		<div>
			{email ? (
				<div>
					change your password {email}. Tady bude stejna logika jako u normal
					change password, jen se tam vlozi new password a zavola se neco
					podobnyho.
				</div>
			) : (
				<form onSubmit={handleForgottenPassword}>
					<label htmlFor="email">your email address:</label>
					<input type="text" name="email" ref={emailRef} />
					<button type="submit">submit</button>
				</form>
			)}
		</div>
	);
};

export const getServerSideProps = async ctx => {
	const data = ctx.query;
	const { resetToken } = data;

	const client = await clientPromise;

	const db = client.db().collection("tokens");

	const existingToken = await db.findOne({ id: resetToken });

	if (!existingToken) {
		return {
			props: {
				email: "",
			},
		};
	}

	return {
		props: {
			email: existingToken.email,
		},
	};
};

export default ForgotPassword;
