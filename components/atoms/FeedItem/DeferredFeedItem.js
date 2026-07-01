import React from "react";
import styled from "styled-components";
import FeedItem from "./FeedItem";
import { useDeferredRender } from "../../../hooks/useDeferredRender";
import SkeletonBlock from "../SkeletonParts/SkeletonBlock";

const FeedShell = styled.div`
  position: relative;
  min-height: ${(props) => props.minHeight};
  scroll-margin-top: ${(props) => props.scrollMarginTop};
`;

function getMinHeight(item) {
  const defaultRatio = "16/9";
  const [width, height] = (item?.aspectRatio || defaultRatio)
    .split("/")
    .map((value) => parseInt(value, 10));

  if (!width || !height) return "320px";

  return `${Math.max(260, Math.round((height / width) * 830))}px`;
}

function DeferredFeedItem(
  { item, id, carouselItem, product, defaultURL, smallURL, scrollMarginTop },
  ref
) {
  const { targetRef, shouldRender } = useDeferredRender();

  const setRefs = (el) => {
    targetRef.current = el;
    if (typeof ref === "function") ref(el);
  };

  return (
    <FeedShell
      ref={setRefs}
      id={item.Title}
      data-post-id={id}
      minHeight={getMinHeight(item)}
      scrollMarginTop={scrollMarginTop}
    >
      {shouldRender ? (
        <FeedItem
          item={item}
          id={id}
          carouselItem={carouselItem}
          product={product}
          defaultURL={defaultURL}
          smallURL={smallURL}
        />
      ) : (
        <SkeletonBlock />
      )}
    </FeedShell>
  );
}

export default React.forwardRef(DeferredFeedItem);
