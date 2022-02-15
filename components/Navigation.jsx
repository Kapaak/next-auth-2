import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const Navigation = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const handleSignVariant = () => {
		if (session) signOut();
		else router.push("/sign-in");
	};
	return (
		<Nav>
			<Link href="/">
				<a>HOME PAGE</a>
			</Link>
			<button onClick={() => console.log(session)}>check the session</button>
			{session && (
				<Link href="/profile">
					<a>user profile</a>
				</Link>
			)}
			<button onClick={() => handleSignVariant()}>
				{session ? "sign out" : "sign in"}
			</button>
		</Nav>
	);
};

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
`;

export default Navigation;
