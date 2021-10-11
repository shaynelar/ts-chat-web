import React from "react";
import styled from "styled-components";
import InputField from "./InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryButton from "./Button";
import { useMutation } from "@apollo/client";
import {
	LoginUserDocument,
	useLoginUserMutation,
} from "../graphql/gen/generated";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: auto;
`;

interface Inputs {
	username: string;
	password: string;
}

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const [loginUser, { data, loading, error }] = useMutation(LoginUserDocument);

	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		loginUser({
			variables: { username: formData.username, password: formData.password },
		}).then(() => console.log(data))
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputField
				placeholder="Username"
				{...register("username", { required: true })}
			/>
			<InputField
				placeholder="Password"
				{...register("password", { required: true })}
			/>
			{errors.password && <span>This field is required</span>}
			<PrimaryButton type="submit">Submit</PrimaryButton>
		</Form>
	);
}