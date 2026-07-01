import React from "react";
import styled from "styled-components";
import StyledSvgContainer from "./StyledSvgContainer";
import { TRANSITION_TIMES } from "../../../styles/constants";

const HelperContainer = styled.div`
  width: 65px;
  height: 54px;
  border-right: ${(props) =>
    props.darkMode ? `1px solid white` : "1px solid black"};
  transition: ease-in-out ${TRANSITION_TIMES.body}ms;
  background-color: ${(props) =>
    props.darkMode ? props.theme.dark.body : props.theme.light.body};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: sticky;
  left: 0;
  z-index: 1;
  margin-right: 8px;
`;

export default function GridBox({ darkMode, onClick }) {
  return (
    <HelperContainer darkMode={darkMode}>
      <StyledSvgContainer
        viewBox="0 0 48 48"
        onClick={onClick}
        width="48"
        height="48"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1 }}
        flexShrink={0}
        fill={"#ececed"}
        hover={"yellow"}
        active={"black"}
        position={"sticky"}
        left={0}
        margin={"0 0 0 3px"}
      >
        <path
          className="cls-1"
          d="M 0 0 L 13.334 0 L 13.334 13.335 L 0 13.335 L 0 0 Z M 17.332 0 L 30.669 0 L 30.669 13.335 L 17.332 13.335 L 17.332 0 Z M 34.666 0 L 48 0 L 48 13.335 L 34.666 13.335 L 34.666 0 Z M 0 17.335 L 13.334 17.335 L 13.334 30.668 L 0 30.668 L 0 17.335 Z M 17.332 17.335 L 30.669 17.335 L 30.669 30.668 L 17.332 30.668 L 17.332 17.335 Z M 34.666 17.335 L 48 17.335 L 48 30.668 L 34.666 30.668 L 34.666 17.335 Z M 0 34.665 L 13.334 34.665 L 13.334 48 L 0 48 L 0 34.665 Z M 17.332 34.665 L 30.669 34.665 L 30.669 48 L 17.332 48 L 17.332 34.665 Z M 34.666 34.665 L 48 34.665 L 48 48 L 34.666 48 L 34.666 34.665 Z"
          data-bx-origin="0.59 0.5"
        ></path>
      </StyledSvgContainer>
    </HelperContainer>
  );
}
