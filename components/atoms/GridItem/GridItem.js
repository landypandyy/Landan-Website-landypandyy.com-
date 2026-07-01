import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GRID_BOX_WIDTH, GRID_BOX_HEIGHT } from "../../../styles/constants";
import ImageWithSkeleton from "../ImageWithSkeleton/ImageWithSkeleton";
const GridItemIMG = styled(motion.div)`
  width: ${(props) => (props.width ? props.width : `${GRID_BOX_WIDTH}px`)};
  height: ${(props) => (props.height ? props.height : `${GRID_BOX_HEIGHT}px`)};
  object-fit: cover;
  position: relative;
  z-index: 0;
  overflow: hidden;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    box-shadow: ${(props) =>
      props.active ? "inset 0 0 0 2px yellow" : "inset 0 0 0 2px transparent"};
  }

  &:hover::after {
    box-shadow: inset 0 0 0 2px yellow;
  }
`;

const GridItem = (
  { smallURL, defaultURL, onClick, width, height, padding, margin, id, active },
  ref
) => {
  return (
    <GridItemIMG
      onClick={onClick}
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      id={id}
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.09 }}
      active={active}
    >
      <ImageWithSkeleton
        id={id}
        src={smallURL || defaultURL}
        fill
        sizes="200px"
        style={{ objectFit: "cover", zIndex: 1 }}
        alt=""
      />
    </GridItemIMG>
  );
};

const forwardGridItem = React.forwardRef(GridItem);

export default forwardGridItem;
