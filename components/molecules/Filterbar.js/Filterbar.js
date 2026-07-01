import React, { useLayoutEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import FilterItem from "../../atoms/List-Items/FilterItem";
import {
  MAX_WINDOW_WIDTH,
  TOP_NAV_HEIGHT,
  Z_INDEXS,
  HEADER_AND_SCROLLBAR_PADDING,
} from "../../../styles/constants";
import { returnSubSections } from "../../../lib/returnData";
import { useStateContext } from "../../../lib/context";

const filterBarFlow = keyframes`
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-60px);
  }
`;

const StyledUL = styled.ul`
  position: sticky;
  z-index: ${Z_INDEXS.scrollBars};
  margin: 0 0 ${HEADER_AND_SCROLLBAR_PADDING}px 0;
  display: flex;
  grid-column: 1/-1;
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
  isolation: isolate;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  padding: 10px 0;
  top: ${TOP_NAV_HEIGHT}px;

  ${(props) =>
    props.$animate &&
    css`
      & > li {
        animation: ${filterBarFlow} 0.5s ease-in-out 0.6s both;
      }
    `}

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -4px;
    right: -4px;
    background-color: ${(props) =>
      props.darkMode ? props.theme.dark.body : props.theme.light.body};
    z-index: -1;
    pointer-events: none;
  }

  @media (min-width: ${MAX_WINDOW_WIDTH}px) {
    top: 0;
  }
`;

export default function Filterbar({
  setCurrentSubSection,
  setFiltering,
  currentSubSection,
}) {
  const { data, fetching } = returnSubSections();
  const [currentListItem, setCurrentListItem] = useState(null);
  const { darkMode, filterBarAnimated, setFilterBarAnimated } = useStateContext();
  const [shouldAnimate] = useState(() => !filterBarAnimated);
  const sub_sections = data?.subSections?.data;

  useLayoutEffect(() => {
    if (shouldAnimate && sub_sections?.length) {
      setFilterBarAnimated(true);
    }
  }, [shouldAnimate, sub_sections, setFilterBarAnimated]);

  const onClick = (subSectionName, idx) => {
    if (currentSubSection === subSectionName) {
      setFiltering(false);
      setCurrentSubSection("");
      setCurrentListItem(null);
    } else {
      setFiltering(true);
      setCurrentSubSection(subSectionName);
      setCurrentListItem(idx);
    }
  };

  const clearFilters = () => {
    setFiltering(false);
    setCurrentSubSection("");
    setCurrentListItem(null);
  };

  if (fetching || !sub_sections?.length) return null;

  return (
    <StyledUL darkMode={darkMode} $animate={shouldAnimate}>
      <FilterItem onClick={clearFilters}>X</FilterItem>
      {sub_sections.map((title, idx) => {
        const cleanedTitle = title.attributes.Name.split(".")[0];

        return (
          <FilterItem
            key={title.attributes.Name}
            active={idx === currentListItem}
            onClick={() => onClick(title.attributes.Name, idx)}
          >
            {cleanedTitle}
          </FilterItem>
        );
      })}
    </StyledUL>
  );
}
