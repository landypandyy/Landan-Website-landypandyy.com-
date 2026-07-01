import GridItem from "../components/atoms/GridItem/GridItem";
import DeferredFeedItem from "../components/atoms/FeedItem/DeferredFeedItem";
import { getFirstImageUrl } from "./media";

export const returnPosts = (
  posts,
  feedView,
  ref,
  setElementToShow,
  product,
  scrollMarginTop
) => {
  const feedOrGirdView = (posts, feedViewProp, ref) => {
    if (!feedViewProp) {
      return posts?.map((item, idx) => {
        const gridImgURL = getFirstImageUrl(item, "grid");
        return (
          <GridItem
            key={idx + "grid"}
            onClick={() => onClick(item.id)}
            defaultURL={gridImgURL}
            id={item.id}
          />
        );
      });
    } else {
      return posts?.map((item, idx) => {
        const feedImgURL = getFirstImageUrl(item, "feed");
        return (
          <DeferredFeedItem
            key={item.id + idx}
            item={item?.attributes}
            defaultURL={feedImgURL}
            carouselItem={item?.attributes?.Img?.data.length > 1 ? item : null}
            ref={ref ? (el) => ref(el) : null}
            id={item.id}
            product={product}
            scrollMarginTop={scrollMarginTop}
          />
        );
      });
    }
  };
  const feedViewProp = feedView?.feedViewProp;
  const setFeedViewProp = feedView?.setFeedViewProp;
  const onClick = (postId) => {
    setFeedViewProp(!feedViewProp);
    setElementToShow(postId);
  };

  return feedOrGirdView(posts, feedViewProp, ref);
};
