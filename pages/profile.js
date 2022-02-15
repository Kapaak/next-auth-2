import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useRef } from "react";

const Profile = ({ user }) => {
	const oldPasswordRef = useRef(null);
	const newPasswordRef = useRef(null);

	const handleDescriptionChange = async e => {
		e.preventDefault();
		const someRandomDescription = "I am coolz";

		try {
			const request = await axios.patch("/api/user/change-description", {
				description: someRandomDescription,
			});
			console.log(request, "client req");
		} catch (error) {
			console.log(error, "client error");
		}
	};

	const handlePasswordChange = async e => {
		e.preventDefault();

		const enteredOldPassword = oldPasswordRef.current.value;
		const enteredNewPassword = newPasswordRef.current.value;

		try {
			const request = await axios.patch("/api/user/change-password", {
				oldPassword: enteredOldPassword,
				newPassword: enteredNewPassword,
			});
			console.log(request, "client req");
		} catch (error) {
			console.log(error, "client error");
		}
	};

	return (
		<div>
			<h1>hello ! {user?.name}</h1>
			<h2>email: {user?.email}</h2>
			<h3>description:{user?.description}</h3>
			<button onClick={e => handleDescriptionChange(e)}>
				change description
			</button>

			<form onSubmit={handlePasswordChange}>
				<label htmlFor="old-password">old password</label>
				<input ref={oldPasswordRef} type="text" name="old-password" />
				<label htmlFor="new-password">new password</label>
				<input ref={newPasswordRef} type="text" name="new-password" />
				<button type="submit">submit password change</button>
			</form>
		</div>
	);
};

export const getServerSideProps = async ctx => {
	const session = await getSession({ ctx });

	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	console.log(session);

	return {
		props: {
			user: session.user,
		},
	};
};

export default Profile;
