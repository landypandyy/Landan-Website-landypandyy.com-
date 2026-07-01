import React, { useMemo, useState } from "react";
import SkeletonTemplate from "../molecules/SkeletonTemplate/SkeletonTemplate";
import Filterbar from "../molecules/Filterbar.js/Filterbar";
import { filterPostsBySubSection } from "../../lib/postFilters";
import { TOP_NAV_HEIGHT } from "../../styles/constants";
import FeedPage from "../templates/FeedPage/FeedPage";

const PortfolioPage = ({
  fetching,
  feedView,
  currentId,
  pageTitle,
  pageMarkup,
  posts,
}) => {
  const CATEGORY_NAME = pageTitle;
  const [currentSubSection, setCurrentSubSection] = useState("");

  const [filtering, setFiltering] = useState(false);
  const filteredPosts = useMemo(
    () =>
      filtering && currentSubSection
        ? filterPostsBySubSection(posts, currentSubSection)
        : posts,
    [posts, filtering, currentSubSection]
  );
  const feedScrollOffset = TOP_NAV_HEIGHT + 40;
  const postsToRender = filtering ? filteredPosts : posts;

  return fetching ? (
    <SkeletonTemplate pageTitle={CATEGORY_NAME || "PORTFOLIO"} />
  ) : (
    <FeedPage
      title={CATEGORY_NAME}
      markup={pageMarkup}
      posts={postsToRender}
      feedView={feedView}
      currentId={currentId}
      scrollOffset={feedScrollOffset}
      filtering={filtering}
      filteredPosts={filteredPosts}
      extraControls={
        <Filterbar
          currentSubSection={currentSubSection}
          setCurrentSubSection={setCurrentSubSection}
          setFiltering={setFiltering}
          filtering={filtering}
        />
      }
      postBarProps={{
        topMobile: `${TOP_NAV_HEIGHT + 40}px`,
        topDesktop: "40px",
        filtering,
        withFilter: true,
        gridRowDesktop: 4,
      }}
    />
  );
};

export default PortfolioPage;
