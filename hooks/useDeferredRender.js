import { useEffect, useRef, useState } from "react";
import { DEFERRED_RENDER_ROOT_MARGIN } from "../styles/constants";

export function useDeferredRender({
  rootMargin = DEFERRED_RENDER_ROOT_MARGIN,
} = {}) {
  const targetRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!targetRef.current || shouldRender) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return { targetRef, shouldRender };
}
