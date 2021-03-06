import styled from "styled-components";
import PrimaryButton from "./Button";
import NavAuthButtonContainer from "./NavAuthButtonContainer";
import { GetMeDocument, LogoutUserDocument } from "../graphql/gen/generated";
import { useQuery } from "@apollo/client";
import { AppState } from "../helpers/store";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { addUser, IUser, removeUser } from "../helpers/userSlice";
import { useMutation } from "@apollo/client";
import { toggle } from "../helpers/asideSlice";
import Logo from "./Logo";
import React from "react";
import { LinkButton } from "./Button";

const NavContainer = styled("header")`
	color: white;
	background-color: ${({ theme }) => theme.colors.primary};
	padding: 1rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid black;
	width: 100%;
	top: 0px;
`;

const Tab = styled("button")`
	@media (min-width: 48rem) {
		display: none;
	}
`;

const NavBar = React.forwardRef((props, ref) => {
	const { loading, data } = useQuery(GetMeDocument);
	const [logoutUser] = useMutation(LogoutUserDocument);
	const dispatch = useAppDispatch();

	const user: IUser = useAppSelector((state: AppState) => ({
		id: state.user.id,
		username: state.user.username,
	}));
	const handleTopicController = () => {
		dispatch(toggle());
	};

	function handleLogout(): void {
		logoutUser().then(() => dispatch(removeUser()));
	}

	if (!loading && data)
		dispatch(
			addUser({ id: data.getMe.user.id, username: data.getMe.user.username })
		);
	function renderNavOptions() {
		if (!loading && user.id) {
			return (
				<NavAuthButtonContainer>
					<h2>{user.username}</h2>{" "}
					<PrimaryButton onClick={() => handleLogout()}>Logout</PrimaryButton>
				</NavAuthButtonContainer>
			);
		} else {
			return (
				<NavAuthButtonContainer>
					<LinkButton href="/login">Login</LinkButton>
					<LinkButton href="/register">Register</LinkButton>
				</NavAuthButtonContainer>
			);
		}
	}

	return (
		<NavContainer>
			<Tab onClick={handleTopicController}>Rooms</Tab>
			<Logo />
			{renderNavOptions()}
		</NavContainer>
	);
});
export default NavBar;
