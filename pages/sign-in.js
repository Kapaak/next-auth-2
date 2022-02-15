import React, { useRef } from "react";
import styled from "styled-components";
import { signIn } from "next-auth/react";

const SignIn = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const handleSignIn = async e => {
		e.preventDefault();
		const enteredEmail = emailRef.current.value;
		const enteredPassword = passwordRef.current.value;

		const result = await signIn("credentials", {
			redirect: false,
			email: enteredEmail,
			password: enteredPassword,
		})
			.then(e => console.log(e))
			.catch(e => console.log(e));
	};
	return (
		<>
			<FormWrapper>
				<Form onSubmit={handleSignIn}>
					<h1>SignIn page</h1>
					<label htmlFor="email">email</label>
					<input
						ref={emailRef}
						type="text"
						name="email"
						required
						aria-required="true"
					/>
					<label htmlFor="password">password</label>
					<input
						type="password"
						name="password"
						required
						aria-required="true"
						ref={passwordRef}
					/>
					<button type="submit">submit</button>
				</Form>
			</FormWrapper>
		</>
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

export default SignIn;
