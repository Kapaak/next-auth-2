import { useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
	const { data: session } = useSession();
	return (
		<div>
			<SignOptions>
				<h1>Select sign option</h1>
				<Link href="/sign-in">
					<a>Sign in page</a>
				</Link>
				<Link href="/sign-up">
					<a>Sign up page</a>
				</Link>
				<Link href="/forgot-password">
					<a>Forgot password</a>
				</Link>
			</SignOptions>
			<button onClick={() => console.log(session)}>session</button>
		</div>
	);
}

const SignOptions = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	align-items: center;
	gap: 2rem;

	a {
		line-height: 2;
		border-bottom: 2px solid coral;
	}
`;
