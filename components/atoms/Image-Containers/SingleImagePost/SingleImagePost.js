import React from "react";
import styled from "styled-components";
import ImageWithSkeleton from "../../ImageWithSkeleton/ImageWithSkeleton";
import {
  MARGIN_BETWEEN_POSTS,
  TRANSITION_TIMES,
} from "../../../../styles/constants";
import { useStateContext } from "../../../../lib/context";

const Container = styled.div`
  transition: ease-in-out ${TRANSITION_TIMES.body}ms;
  position: relative;
  user-select: none;
  width: 100%;
  margin-top: ${MARGIN_BETWEEN_POSTS}px;
  margin: ${(props) => props.margin};
  background-color: ${(props) =>
    props.darkMode ? props.theme.dark.sidebar : props.theme.light.sidebar};
  grid-row: ${(props) => props.gridRow};
  grid-column: ${(props) => props.gridColumn};
  padding-top: ${(props) => `${props.paddingTop}%`};
`;

function calcAspectRatio(aspectRatio) {
  const defaultRatio = "16/9";
  const ratiosArray = aspectRatio
    ? aspectRatio.split("/")
    : defaultRatio.split("/");
  for (let i = 0; i < ratiosArray.length; i++) {
    ratiosArray[i] = parseInt(ratiosArray[i]);
  }
  const divided = ratiosArray[1] / ratiosArray[0];
  const paddingTop = (divided * 100).toFixed(2);
  return paddingTop;
}

const SingleImagePost = ({ src, post, id, gridColumn, gridRow }, ref) => {
  const aspectRatio = post?.aspectRatio;
  const { darkMode } = useStateContext();
  return (
    <Container
      gridColumn={gridColumn}
      ref={ref}
      id={id}
      darkMode={darkMode}
      paddingTop={calcAspectRatio(aspectRatio)}
      margin={"0 0 10px 0"}
    >
      <ImageWithSkeleton
        src={src}
        fill
        sizes="(max-width: 830px) 100vw, 830px"
        quality={90}
        style={{ objectFit: "contain", zIndex: 1 }}
        alt={post?.Title || ""}
      />
    </Container>
  );
};

const forwardSingleImagePost = React.forwardRef(SingleImagePost);
export default forwardSingleImagePost;
