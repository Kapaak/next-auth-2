import axios from "axios";
import { getSession } from "next-auth/react";
import React from "react";

const Profile = ({ user }) => {
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

	return (
		<div>
			<h1>hello ! {user?.name}</h1>
			<h2>email: {user?.email}</h2>
			<h3>description:{user?.description}</h3>
			<button onClick={e => handleDescriptionChange(e)}>
				change description
			</button>
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
