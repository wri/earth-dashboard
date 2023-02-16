// -------- TOPICS ----------
export const CLIMATE = "climate";
export const FRESHWATER = "freshwater";
export const OCEAN = "ocean";
export const FORESTS = "forests";
export const BIODIVERSITY = "biodiversity";
export const INDIGENOUS = "indigenous";

// ------- TOPIC COLORS -------
export const CLIMATE_COLOR = "#F35600";
export const CLIMATE_DARK_COLOR = "#752900";
export const CLIMATE_SECONDARY_COLOR = "#D85D44";

export const FRESHWATER_COLOR = "#1F88FF";
export const FRESHWATER_DARK_COLOR = "#003E85";
export const FRESHWATER_SECONDARY_COLOR = "#11466E";

export const OCEAN_COLOR = "#31A9BF";
export const OCEAN_DARK_COLOR = "#174F59";
export const OCEAN_SECONDARY_COLOR = "#31A9BF";

export const FORESTS_COLOR = "#009A67";
export const FORESTS_DARK_COLOR = "#004D33";
export const FORESTS_SECONDARY_COLOR = "#004D33";

export const BIODIVERSITY_COLOR = "#009A67";
export const BIODIVERSITY_DARK_COLOR = "#004D33";
export const BIODIVERSITY_SECONDARY_COLOR = "#004D33";

export function getColorByTopic(topicSt: string) {
  switch (topicSt) {
    case CLIMATE:
      return CLIMATE_COLOR;
    case FRESHWATER:
      return FRESHWATER_COLOR;
    case OCEAN:
      return OCEAN_COLOR;
    case FORESTS:
      return FORESTS_COLOR;
    case BIODIVERSITY:
      return BIODIVERSITY_COLOR;
  }
}

export function getNavigationDotsColorByTopic(topicSt: string) {
  switch (topicSt) {
    case CLIMATE:
      return "#6E2517";
    case FRESHWATER:
      return "#11466E";
    case OCEAN:
      return "#174F59";
    case FORESTS:
      return "#004D33";
    case BIODIVERSITY:
      return "#004D33";
    case "default":
      return "#7C90A2";
  }
}

const SHARE_ICONS_COMMON_PATH = "/static/images/share";

export function getEmailIconPerTopic(topicSt: string) {
  if (topicSt) {
    return `${SHARE_ICONS_COMMON_PATH}/email_${topicSt}.svg`;
  } else {
    return `${SHARE_ICONS_COMMON_PATH}/email_white.svg`;
  }
}
export function getFacebookIconPerTopic(topicSt: string) {
  if (topicSt) {
    return `${SHARE_ICONS_COMMON_PATH}/facebook_${topicSt}.svg`;
  } else {
    return `${SHARE_ICONS_COMMON_PATH}/facebook_white.svg`;
  }
}
export function getTwitterIconPerTopic(topicSt: string) {
  if (topicSt) {
    return `${SHARE_ICONS_COMMON_PATH}/twitter_${topicSt}.svg`;
  } else {
    return `${SHARE_ICONS_COMMON_PATH}/twitter_white.svg`;
  }
}
