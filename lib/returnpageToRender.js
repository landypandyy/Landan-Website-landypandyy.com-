import {
  returnShopCategoryData,
  returnShopSectionData,
  returnDATA_SectionData,
  returnDATA_CategoryData,
} from "../lib/returnData";
export const returnPageType = (routeParam, secondaryRouteParam) => {
  const { fetching, posts, markup } = secondaryRouteParam
    ? returnDATA_SectionData(secondaryRouteParam, routeParam)
    : returnDATA_CategoryData(routeParam);
  const { products, richText } = secondaryRouteParam
    ? returnShopSectionData(secondaryRouteParam, routeParam)
    : returnShopCategoryData(routeParam);

  if (!fetching) {
    if (!posts && !products) {
      return {
        result: "no result",
        filtering: false,
        items: [],
        markup,
      };
    }
    if (products?.length) {
      return {
        result: "products",
        filtering: false,
        items: products,
        richText,
      };
    } else if (posts?.length) {
      for (let post of posts) {
        if (post.attributes?.sub_section?.data?.attributes?.Name) {
          return { result: "posts", filtering: true, items: posts, markup };
        }
      }
      return { result: "posts", filtering: false, items: posts, markup };
    }
  }
  return { result: [], fetching, markup };
};
