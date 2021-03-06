import React from "react";
import styled from "styled-components";

const Wrapper = styled("main")`
	padding: 0px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
export default function MainWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Wrapper>{children}</Wrapper>;
}
