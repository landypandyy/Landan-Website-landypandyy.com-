import React from "react";
import styled from "styled-components";
import ImageWithSkeleton from "../ImageWithSkeleton/ImageWithSkeleton";
import { GRID_BOX_WIDTH, GRID_BOX_HEIGHT } from "../../../styles/constants";

const StyledDiv = styled.div`
  width: ${(props) => (props.width ? props.width : `${GRID_BOX_WIDTH}px`)};
  height: ${(props) => (props.height ? props.height : `${GRID_BOX_HEIGHT}px`)};
  position: relative;
  flex-shrink: 0;
  &:hover {
    outline: 2px solid yellow;
  }
  outline: ${(props) => (props.active ? "2px solid yellow" : "none")};
  outline-offset: 0;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  z-index: 0;
`;

const toImageDimension = (value, fallback) => {
  if (typeof value === "number") return value;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const PostBarItem = (
  { smallURL, defaultURL, onClick, width, height, padding, margin, id, active },
  ref
) => {
  const imageWidth = toImageDimension(width, GRID_BOX_WIDTH);
  const imageHeight = toImageDimension(height, GRID_BOX_HEIGHT);

  return (
    <StyledDiv
      id={id}
      ref={ref}
      active={active}
      width={width}
      height={height}
      padding={padding}
      margin={margin}
    >
      <ImageWithSkeleton
        onClick={onClick}
        src={smallURL || defaultURL}
        width={imageWidth}
        height={imageHeight}
        loading="lazy"
        sizes={`${imageWidth}px`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          zIndex: 1,
        }}
        alt=""
      />
    </StyledDiv>
  );
};

const forwardPostBarItem = React.forwardRef(PostBarItem);

export default forwardPostBarItem;
