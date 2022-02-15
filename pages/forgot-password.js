import axios from "axios";
import React, { useRef } from "react";

const ForgotPassword = () => {
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
			<h1>ForgotPassword</h1>
			<form onSubmit={handleForgottenPassword}>
				<label htmlFor="email">your email address:</label>
				<input type="text" name="email" ref={emailRef} />
				<button type="submit">submit</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
