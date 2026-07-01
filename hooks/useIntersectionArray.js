import { useEffect, useRef } from "react";

const INTERSECTION_THRESHOLDS = [0, 0.25, 0.5, 0.75];

const getPostId = (element) => element?.dataset?.postId || element?.id;

const getDistanceFromActiveLine = (entry, activeLineOffset) =>
  Math.abs(entry.boundingClientRect.top - activeLineOffset);

const getActiveEntry = (entries, activeLineOffset) =>
  entries
    .filter((entry) => entry.isIntersecting)
    .sort(
      (a, b) =>
        getDistanceFromActiveLine(a, activeLineOffset) -
        getDistanceFromActiveLine(b, activeLineOffset)
    )[0];

export function useIntersectionArray(
  ref,
  feedView,
  setter,
  filtering,
  filteredPosts,
  activeLineOffset = 0
) {
  const visibleEntries = useRef(new Map());

  useEffect(() => {
    const visibleMap = visibleEntries.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target, entry);
          } else {
            visibleMap.delete(entry.target);
          }
        });

        const visibleEntry = getActiveEntry(
          Array.from(visibleMap.values()),
          activeLineOffset
        );

        if (visibleEntry) {
          setter(getPostId(visibleEntry.target));
        }
      },
      { threshold: INTERSECTION_THRESHOLDS }
    );

    ref.current.forEach((divElement) => {
      observer.observe(divElement);
    });

    return () => {
      observer.disconnect();
      visibleMap.clear();
    };
  }, [ref.current, feedView, filtering, filteredPosts]);

  useEffect(() => {
    ref.current = [];
    visibleEntries.current.clear();
  }, [feedView, filtering, filteredPosts]);
}
