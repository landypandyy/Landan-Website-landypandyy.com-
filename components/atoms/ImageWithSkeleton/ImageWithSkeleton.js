import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SkeletonBlock from "../SkeletonParts/SkeletonBlock";

const isImageReady = (img) =>
  Boolean(img?.complete && img.naturalWidth > 0);

export default function ImageWithSkeleton({
  onLoad,
  onLoadingComplete,
  onError,
  style,
  src,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef(null);
  const previousSrcRef = useRef(src);

  const markLoaded = useCallback(
    (event) => {
      setLoaded(true);
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleLoadingComplete = useCallback(
    (img) => {
      setLoaded(true);
      onLoadingComplete?.(img);
    },
    [onLoadingComplete]
  );

  const handleError = useCallback(
    (event) => {
      setLoaded(true);
      onError?.(event);
    },
    [onError]
  );

  useEffect(() => {
    if (previousSrcRef.current === src) return;

    previousSrcRef.current = src;
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (!src) return undefined;

    const syncLoadedState = () => {
      if (isImageReady(imageRef.current)) {
        setLoaded(true);
      }
    };

    syncLoadedState();

    const frameId = requestAnimationFrame(syncLoadedState);
    return () => cancelAnimationFrame(frameId);
  }, [src]);

  if (!src) {
    return <SkeletonBlock />;
  }

  return (
    <>
      {!loaded && <SkeletonBlock />}
      <Image
        ref={imageRef}
        src={src}
        {...props}
        onLoad={markLoaded}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 200ms ease-in-out",
        }}
      />
    </>
  );
}
