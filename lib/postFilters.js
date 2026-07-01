const normalizeDataName = (value) =>
  typeof value === "string" ? value.toLowerCase() : "";

export const filterPostsBySection = (posts = [], sectionDataName) => {
  const target = normalizeDataName(sectionDataName);
  if (!target) return posts;

  return posts.filter(
    (post) =>
      normalizeDataName(post.attributes?.section?.data?.attributes?.dataName) ===
      target
  );
};

export const filterPostsBySubSection = (posts = [], subSectionName) => {
  if (!subSectionName) return posts;

  return posts.filter(
    (post) =>
      post.attributes?.sub_section?.data?.attributes?.Name === subSectionName
  );
};
