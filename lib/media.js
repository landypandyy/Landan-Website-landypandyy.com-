const formatOrderByIntent = {
  thumbnail: ["thumbnail", "small", "medium", "large"],
  grid: ["small", "thumbnail", "medium", "large"],
  feed: [],
  carousel: [],
};

export const getMediaUrl = (media, intent = "feed") => {
  const attributes = media?.attributes || media;
  if (!attributes) return undefined;

  const formats = attributes.formats || {};
  const formatOrder = formatOrderByIntent[intent] || formatOrderByIntent.feed;
  const matchedFormat = formatOrder.find((format) => formats[format]?.url);

  return matchedFormat ? formats[matchedFormat].url : attributes.url;
};

export const getFirstImage = (entry) => entry?.attributes?.Img?.data?.[0];

export const getFirstImageUrl = (entry, intent = "feed") =>
  getMediaUrl(getFirstImage(entry), intent);
