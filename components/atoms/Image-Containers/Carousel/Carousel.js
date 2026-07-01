import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateContext } from "../../../../lib/context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  TRANSITION_TIMES,
  MARGIN_BETWEEN_POSTS,
} from "../../../../styles/constants";
import ImageWithSkeleton from "../../ImageWithSkeleton/ImageWithSkeleton";
import SkeletonBlock from "../../SkeletonParts/SkeletonBlock";
import { getMediaUrl } from "../../../../lib/media";

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

const CarouselContainer = styled.div`
  display: flex;
  margin-top: ${MARGIN_BETWEEN_POSTS}px;
  margin: ${(props) => props.margin};
  background-color: ${(props) =>
    props.darkMode ? props.theme.dark.sidebar : props.theme.light.sidebar};
  width: 100%;
  transition: ease-in-out ${TRANSITION_TIMES.body}ms;
  padding-top: ${(props) => `${props.paddingTop}%`};
  position: relative;
  width: 100%;
  justify-content: center;
  user-select: none;
  & .slick-slide {
    & img {
      object-fit: contain;
      width: 100%;
      max-height: 100%;
    }
  }

  & .swiper-pagination-bullet {
    background-color: ${(props) =>
      props.darkMode ? props.theme.light.sidebar : props.theme.dark.sidebar};
  }

  & .swiper-pagination-bullet-active {
    background-color: yellow;
  }
`;

const VideoPlayer = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 48px);
  height: calc(100% - 48px);
  object-fit: contain;
  z-index: 1;
  transition: opacity 200ms ease-in-out;
`;

const DeferredSlide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

function CarouselVideo({ src }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <>
      {!loaded && <SkeletonBlock />}
      <VideoPlayer
        controls
        preload="metadata"
        playsInline
        onCanPlay={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <source src={src} type="video/mp4" />
      </VideoPlayer>
    </>
  );
}

const CarouselObj = ({ post, id }, ref) => {
  const { darkMode } = useStateContext();
  const imgData = post?.attributes?.Img?.data;
  const aspectRatio = post?.attributes?.aspectRatio;
  const [activeIdx, setActiveIdx] = useState(0);

  const imageOrVideo = (item, idx) => {
    if (Math.abs(idx - activeIdx) > 1) {
      return (
        <SwiperSlide key={`${id}-${idx}-deferred`} style={{ position: "relative" }}>
          <DeferredSlide>
            <SkeletonBlock />
          </DeferredSlide>
        </SwiperSlide>
      );
    }

    if (item.attributes.ext === ".mp4") {
      return (
        <SwiperSlide key={`${id}-${idx}-video`} style={{ position: "relative" }}>
          <CarouselVideo src={item?.attributes?.url} />
        </SwiperSlide>
      );
    }

    return (
      <SwiperSlide key={`${id}-${idx}-image`} style={{ position: "relative" }}>
        <ImageWithSkeleton
          fill
          sizes="(max-width: 830px) 100vw, 830px"
          quality={90}
          style={{ objectFit: "contain", maxHeight: "100%", zIndex: 1 }}
          src={getMediaUrl(item, "carousel")}
          alt={post?.attributes?.Title || ""}
        />
      </SwiperSlide>
    );
  };

  return (
    <CarouselContainer
      paddingTop={calcAspectRatio(aspectRatio)}
      ref={ref}
      id={id}
      darkMode={darkMode}
      margin={"0 0 10px 0"}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIdx(swiper.activeIndex)}
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {imgData?.map((item, idx) => imageOrVideo(item, idx))}
      </Swiper>
    </CarouselContainer>
  );
};

const forwardCarousel = React.forwardRef(CarouselObj);
export default forwardCarousel;
