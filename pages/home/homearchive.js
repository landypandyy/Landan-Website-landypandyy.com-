import React from "react";
import {
  returnHomeArchiveData,
} from "../../lib/returnData";
import { TOP_NAV_HEIGHT } from "../../styles/constants";
import SkeletonTemplate from "../../components/molecules/SkeletonTemplate/SkeletonTemplate";
import FeedPage from "../../components/templates/FeedPage/FeedPage";

const HomeArchive = ({ feedView, currentId }) => {
  const CATEGORY_NAME = "home archive";
  const { fetching, posts, richText } = returnHomeArchiveData();
  const feedScrollOffset = TOP_NAV_HEIGHT;
  return fetching ? (
    <SkeletonTemplate pageTitle={CATEGORY_NAME} />
  ) : (
    <FeedPage
      title={CATEGORY_NAME}
      markup={richText}
      posts={posts}
      feedView={feedView}
      currentId={currentId}
      scrollOffset={feedScrollOffset}
      postBarProps={{
        gridRow: 3,
        topMobile: `${TOP_NAV_HEIGHT}px`,
        topDesktop: 0,
      }}
    />
  );
};
const forwardHomeArchive = React.forwardRef(HomeArchive);
export default forwardHomeArchive;
