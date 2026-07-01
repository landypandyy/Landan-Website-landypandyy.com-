import React from "react";
import FeedPage from "../templates/FeedPage/FeedPage";
import { TOP_NAV_HEIGHT } from "../../styles/constants";
export default function SocialPage({
  fetching,
  feedView,
  currentId,
  pageTitle,
  pageMarkup,
  posts,
}) {
  const CATEGORY_NAME = pageTitle;
  const feedScrollOffset = TOP_NAV_HEIGHT;
  return (
    <FeedPage
      title={CATEGORY_NAME}
      markup={pageMarkup}
      posts={posts}
      feedView={feedView}
      currentId={currentId}
      scrollOffset={feedScrollOffset}
      postBarProps={{
        gridRow: 4,
        gridRowDesktop: 3,
        topMobile: `${TOP_NAV_HEIGHT}px`,
        topDesktop: 0,
      }}
    />
  );
}
