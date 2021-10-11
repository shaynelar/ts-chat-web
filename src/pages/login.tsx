import React from "react";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import { LoginForm } from "../components/AuthForm";

export default function login() {
	return (
		<MainWrapper>
			<NavBar />
			<p>Login Page</p>
			<LoginForm />
		</MainWrapper>
	);
}
