import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { filterPostsBySection } from "./postFilters";
import { normalizeCollection, strapiGet } from "./strapiRest";
import {
  categoryPostsParams,
  categoryProductsParams,
  postPopulate,
  sectionPostsParams,
  sectionProductsParams,
  strapiQueryKey,
} from "./strapiQueryKeys";

const useStrapiCollection = (path, params, options = {}) => {
  const queryKey = useMemo(() => ["strapi", path, params], [path, params]);
  const enabled = options.enabled !== false;
  const query = useQuery({
    queryKey,
    queryFn: () => strapiGet(path, params).then(normalizeCollection),
    enabled,
  });

  return {
    fetching: query.isLoading || query.isFetching,
    data: query.data,
    error: query.error,
  };
};

const sortByPublishedAt = (items = []) =>
  items.sort(
    (a, b) =>
      new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt)
  );

const sortByDate = (items = []) =>
  items.sort((a, b) => new Date(b.attributes.Date) - new Date(a.attributes.Date));

const errorView = (error) => <p>error {error.message}</p>;

const basePagination = {
  "pagination[start]": 0,
  "pagination[limit]": 100,
};

const categoryPopulate = {
  "populate[section_header][fields][0]": "Description",
  "populate[sections][fields][0]": "SectionName",
  "populate[sections][fields][1]": "dataName",
  ...basePagination,
};

const sectionPopulate = {
  "populate[section_header][fields][0]": "Description",
  ...basePagination,
};

const isRouteReady = (value) =>
  typeof value === "string" && value.length > 0 && !value.includes("[");

export const returnNavData = () => {
  const { data, fetching, error } = useStrapiCollection("/categories", {
    populate: "*",
    "pagination[limit]": 100,
  });

  if (fetching) return { fetching };
  if (error) return errorView(error);
  const results = data.data;

  results.sort((a, b) => {
    const fa = a.attributes.name.toLowerCase();
    const fb = b.attributes.name.toLowerCase();

    if (fa === "links") return 1;
    if (fb === "links") return -1;

    return fa.localeCompare(fb);
  });

  return { fetching, results };
};

export const returnCategoryData = (nameParam) => {
  const categoryResult = useStrapiCollection("/categories", {
    ...categoryPopulate,
    "filters[name][$eq]": nameParam,
  });
  const postsResult = useStrapiCollection("/posts", {
    ...postPopulate,
    "filters[category][name][$eq]": nameParam,
  });

  const fetching = categoryResult.fetching || postsResult.fetching;
  if (fetching) return { fetching };
  if (categoryResult.error) return errorView(categoryResult.error);
  if (postsResult.error) return errorView(postsResult.error);
  const category = categoryResult.data?.data?.[0];
  const posts = sortByPublishedAt(postsResult.data?.data || []);
  const markup = category?.attributes?.section_header?.data?.attributes?.Description;
  return { fetching, posts, markup };
};
export const returnDATA_CategoryData = (nameParam, totalItemsPerPage) => {
  const categoryResult = useStrapiCollection("/categories", {
    ...categoryPopulate,
    "filters[dataName][$eq]": nameParam,
  }, { enabled: isRouteReady(nameParam) });
  const postsResult = useStrapiCollection(
    "/posts",
    categoryPostsParams(nameParam),
    { enabled: isRouteReady(nameParam) }
  );

  const fetching = categoryResult.fetching || postsResult.fetching;
  if (fetching) return { fetching };
  if (categoryResult.error) return errorView(categoryResult.error);
  if (postsResult.error) return errorView(postsResult.error);
  const category = categoryResult.data?.data?.[0];
  const posts = sortByDate(postsResult.data?.data || []);
  const markup = category?.attributes?.section_header?.data?.attributes?.Description;
  return { fetching, posts, markup };
};

export const returnSectionData = (nameParam) => {
  const sectionResult = useStrapiCollection("/section-names", {
    ...sectionPopulate,
    "filters[SectionName][$eq]": nameParam,
  });
  const postsResult = useStrapiCollection("/posts", {
    ...postPopulate,
    "filters[section][SectionName][$eq]": nameParam,
  });
  const fetching = sectionResult.fetching || postsResult.fetching;
  if (fetching) return { fetching };
  if (sectionResult.error) return errorView(sectionResult.error);
  if (postsResult.error) return errorView(postsResult.error);

  const section = sectionResult.data?.data?.[0];
  const posts = sortByPublishedAt(postsResult.data?.data || []);
  const markup = section?.attributes?.section_header?.data?.attributes?.Description;
  return { posts, markup };
};
export const returnDATA_SectionData = (sectionDataName, categoryDataName) => {
  const queryClient = useQueryClient();
  const cachedCategoryPosts = categoryDataName
    ? queryClient.getQueryData(
        strapiQueryKey("/posts", categoryPostsParams(categoryDataName))
      )
    : null;
  const cachedPosts = cachedCategoryPosts?.data;
  const hasCachedPosts = Array.isArray(cachedPosts) && cachedPosts.length > 0;

  const sectionResult = useStrapiCollection(
    "/section-names",
    {
      ...sectionPopulate,
      "filters[dataName][$eq]": sectionDataName,
    },
    { enabled: isRouteReady(sectionDataName) }
  );
  const postsResult = useStrapiCollection(
    "/posts",
    sectionPostsParams(sectionDataName),
    {
      enabled: isRouteReady(sectionDataName) && !hasCachedPosts,
    }
  );

  const fetching = sectionResult.fetching || (!hasCachedPosts && postsResult.fetching);
  if (fetching) return { fetching };
  if (sectionResult.error) return errorView(sectionResult.error);
  if (postsResult.error) return errorView(postsResult.error);

  const section = sectionResult.data?.data?.[0];
  const posts = hasCachedPosts
    ? sortByDate(filterPostsBySection(cachedPosts, sectionDataName))
    : sortByDate(postsResult.data?.data || []);
  const markup = section?.attributes?.section_header?.data?.attributes?.Description;
  return { fetching, posts, markup };
};

export const returnSubSections = () => {
  const { data, fetching, error } = useStrapiCollection("/sub-sections", {
    "pagination[limit]": 100,
  });

  if (fetching) return { fetching };
  if (error) return errorView(error);
  return { data: { subSections: data } };
};

export const returnShopCategoryData = (nameParam) => {
  const categoryResult = useStrapiCollection("/categories", {
    ...categoryPopulate,
    "filters[dataName][$eq]": nameParam,
  }, { enabled: isRouteReady(nameParam) });
  const productsResult = useStrapiCollection(
    "/products",
    categoryProductsParams(nameParam),
    { enabled: isRouteReady(nameParam) }
  );
  const fetching = categoryResult.fetching || productsResult.fetching;
  if (fetching) return { fetching };
  if (categoryResult.error) return errorView(categoryResult.error);
  if (productsResult.error) return errorView(productsResult.error);
  const category = categoryResult.data?.data?.[0];
  const products = sortByDate(productsResult.data?.data || []);
  const richText = category?.attributes?.section_header?.data?.attributes?.Description;

  return { fetching, products, richText };
};

export const returnShopSectionData = (sectionDataName, categoryDataName) => {
  const queryClient = useQueryClient();
  const cachedCategoryProducts = categoryDataName
    ? queryClient.getQueryData(
        strapiQueryKey("/products", categoryProductsParams(categoryDataName))
      )
    : null;
  const cachedProducts = cachedCategoryProducts?.data;
  const hasCachedProducts =
    Array.isArray(cachedProducts) && cachedProducts.length > 0;

  const sectionResult = useStrapiCollection(
    "/section-names",
    {
      ...sectionPopulate,
      "filters[dataName][$eq]": sectionDataName,
    },
    { enabled: isRouteReady(sectionDataName) }
  );
  const productsResult = useStrapiCollection(
    "/products",
    sectionProductsParams(sectionDataName),
    {
      enabled: isRouteReady(sectionDataName) && !hasCachedProducts,
    }
  );
  const fetching =
    sectionResult.fetching || (!hasCachedProducts && productsResult.fetching);
  if (fetching) return { fetching };
  if (sectionResult.error) return errorView(sectionResult.error);
  if (productsResult.error) return errorView(productsResult.error);
  const section = sectionResult.data?.data?.[0];
  const products = hasCachedProducts
    ? sortByDate(filterPostsBySection(cachedProducts, sectionDataName))
    : sortByDate(productsResult.data?.data || []);
  const richText = section?.attributes?.section_header?.data?.attributes?.Description;
  return { fetching, products, richText };
};

export const returnHomePageImage = () => {
  const { data, fetching, error } = useStrapiCollection("/posts", {
    ...postPopulate,
    "filters[HomepageHero][$eq]": true,
  });
  if (fetching) return { fetching };
  if (error) return errorView(error);
  const posts = data?.data || [];
  return { posts };
};

export const returnHiddenHomeImage = () => {
  const { data, fetching, error } = useStrapiCollection("/hidden-items", {
    populate: "*",
    "filters[active][$eq]": true,
  });
  if (fetching || error) return {};
  const hidden = data?.data?.[0];
  const hiddenImgSrc = hidden?.attributes?.img?.data?.attributes?.url;
  const hiddenImgText = hidden?.attributes?.text;
  return { hiddenImgSrc, hiddenImgText };
};

export const returnHomeArchiveData = () => {
  const archiveResult = useStrapiCollection("/home-archives", {
    "populate[section_header][fields][0]": "Description",
  });
  const postsResult = useStrapiCollection("/posts", {
    ...postPopulate,
    "filters[home_archive][documentId][$notNull]": true,
  });
  const fetching = archiveResult.fetching || postsResult.fetching;
  if (fetching) return { fetching };
  if (archiveResult.error) return errorView(archiveResult.error);
  if (postsResult.error) return errorView(postsResult.error);
  const archive = archiveResult.data?.data?.[0];
  const posts = sortByDate(postsResult.data?.data || []);
  const richText = archive?.attributes?.section_header?.data?.attributes?.Description;
  return { posts, richText };
};

export const returnLegitReviews = () => {
  const { data, fetching, error } = useStrapiCollection("/legit-reviews", {
    "pagination[limit]": 100,
  });
  if (fetching) return { fetching };
  if (error) return errorView(error);
  const reviews = data?.data;
  return { reviews };
};

export const returnShoppingStatus = () => {
  const { data, fetching, error } = useStrapiCollection("/shopping-status-messages", {
    "pagination[limit]": 100,
  });
  if (fetching) return { fetching };
  if (error) return errorView(error);
  const messages = data?.data || [];
  const success = messages.find((item) => item.attributes.type === "success") || messages[0];
  const failed = messages.find((item) => item.attributes.type === "failed") || messages[1];
  return { success, failed };
};
