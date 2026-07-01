const basePagination = {
  "pagination[start]": 0,
  "pagination[limit]": 100,
};

export const postPopulate = {
  populate: "*",
  ...basePagination,
};

export const categoryPostsParams = (categoryDataName) => ({
  ...postPopulate,
  "filters[category][dataName][$eq]": categoryDataName,
});

export const sectionPostsParams = (sectionDataName) => ({
  ...postPopulate,
  "filters[section][dataName][$eq]": sectionDataName,
});

export const categoryProductsParams = (categoryDataName) => ({
  ...postPopulate,
  "filters[category][dataName][$eq]": categoryDataName,
});

export const sectionProductsParams = (sectionDataName) => ({
  ...postPopulate,
  "filters[section][dataName][$eq]": sectionDataName,
});

export const strapiQueryKey = (path, params) => ["strapi", path, params];
