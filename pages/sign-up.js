import axios from "axios";
import React, { useRef } from "react";
import styled from "styled-components";

const SignUp = () => {
	const emailRef = useRef(null);
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	const handleSignUp = async e => {
		e.preventDefault();
		const enteredEmail = emailRef.current.value;
		const enteredUsername = usernameRef.current.value;
		const enteredPassword = passwordRef.current.value;

		try {
			const request = await axios.post("/api/auth/sign-up", {
				email: enteredEmail,
				username: enteredUsername,
				password: enteredPassword,
			});
			console.log(request, "req client");
		} catch (error) {
			console.log(error, "error client");
		}

		console.log(enteredEmail, enteredUsername, enteredPassword, "peeep client");
	};

	return (
		<FormWrapper>
			<Form onSubmit={handleSignUp}>
				<h1>SignUp page</h1>
				<label htmlFor="email">email</label>
				<input
					ref={emailRef}
					type="text"
					name="email"
					required
					aria-required="true"
				/>
				<label htmlFor="username">username</label>
				<input
					ref={usernameRef}
					type="text"
					name="username"
					required
					aria-required="true"
				/>
				<label htmlFor="password">password</label>
				<input
					ref={passwordRef}
					type="password"
					name="password"
					required
					aria-required="true"
				/>
				<button type="submit">submit</button>
			</Form>
		</FormWrapper>
	);
};

const FormWrapper = styled.div`
	height: 100vh;
	padding: 2rem;
`;

const Form = styled.form`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	input {
		padding: 0.3rem 0.5rem;
	}
`;

export default SignUp;
