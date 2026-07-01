import { useEffect, useRef, useState } from "react";
import { useIntersectionArray } from "./useIntersectionArray";

const findScrollElement = (elements, elementToShow) =>
  elements.find(
    (el) =>
      el?.dataset?.postId === String(elementToShow) ||
      el?.id === String(elementToShow)
  );

export function useFeedNavigation({
  feedView,
  setCurrentIdInView,
  filtering = null,
  filteredPosts = null,
  scrollOffset = 0,
}) {
  const ref = useRef([]);
  const [elementToShow, setElementToShow] = useState();
  const [clickToElement, setClickToElement] = useState(true);
  const scrollMarginTop = `${scrollOffset}px`;

  const addToRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  useEffect(() => {
    if (
      feedView.feedViewProp &&
      ref.current &&
      clickToElement &&
      elementToShow
    ) {
      const scrollElement = findScrollElement(ref.current, elementToShow);
      scrollElement?.scrollIntoView({ block: "start" });
      if (scrollElement) setClickToElement(false);
    }
  }, [feedView, clickToElement, elementToShow]);

  useIntersectionArray(
    ref,
    feedView,
    setCurrentIdInView,
    filtering,
    filteredPosts,
    scrollOffset
  );

  return {
    addToRefs,
    clickToElement,
    elementToShow,
    scrollMarginTop,
    setClickToElement,
    setElementToShow,
  };
}
