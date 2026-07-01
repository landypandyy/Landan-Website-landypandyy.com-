import React from "react";
import Header from "../../atoms/List-Items/Header";
import PostBar from "../../molecules/PostBar/PostBar";
import RichTextParagraph from "../../atoms/RichTextParagraph/RichTextParagraph";
import { returnPosts } from "../../../lib/returnposts";
import { useFeedNavigation } from "../../../hooks/useFeedNavigation";
import { TOP_PARAGRAPH_SECTION_PADDING } from "../../../styles/constants";

export default function FeedPage({
  title,
  markup,
  posts,
  feedView,
  currentId,
  postBarProps,
  scrollOffset,
  isProduct = false,
  filtering = null,
  filteredPosts = null,
  extraControls = null,
}) {
  const {
    addToRefs,
    clickToElement,
    elementToShow,
    scrollMarginTop,
    setClickToElement,
    setElementToShow,
  } = useFeedNavigation({
    feedView,
    setCurrentIdInView: currentId.setCurrentIdInView,
    filtering,
    filteredPosts,
    scrollOffset,
  });

  return (
    <>
      <Header
        textAlign={"left"}
        fontWeight={"700"}
        color={"black"}
        padding={`${TOP_PARAGRAPH_SECTION_PADDING}px 0 0 0`}
        bigScreenPadding={0}
      >
        {title}
      </Header>
      <PostBar
        {...postBarProps}
        feedView={feedView}
        posts={posts}
        currentId={currentId.currentIdInView}
        clickToElement={clickToElement}
        setClickToElement={setClickToElement}
        elementToShow={elementToShow}
      />
      <RichTextParagraph markup={markup} />
      {extraControls}
      {returnPosts(
        posts,
        feedView,
        addToRefs,
        setElementToShow,
        isProduct,
        scrollMarginTop
      )}
    </>
  );
}
