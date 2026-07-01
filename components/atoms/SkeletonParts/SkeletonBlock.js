import React from "react";
import styled from "styled-components";
import { useStateContext } from "../../../lib/context";

const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-color: ${(props) =>
    props.darkMode ? props.theme.dark.sidebar : props.theme.light.sidebar};
  animation: skeleton-loading-block 1s linear infinite alternate;
  pointer-events: none;
  display: ${(props) => (props.hidden ? "none" : "block")};

  @keyframes skeleton-loading-block {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

export default function SkeletonBlock({ hidden }) {
  const { darkMode } = useStateContext();
  return <Skeleton darkMode={darkMode} hidden={hidden} />;
}
