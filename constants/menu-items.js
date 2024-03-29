import TwitterIcon from "public/static/icons/twitter.svg";
import LinkedInIcon from "public/static/icons/linkedin.svg";

export const MenuItems = [
  {
    key: "earth-hq",
    hasarrow: false,
    label: "Back to Earth HQ",
    body: "See the latest extreme events and discover near-real time data on Earth HQ – the “Situation Room” for the planet.",
    link: "/"
  },
  {
    key: "climate",
    label: "Climate News",
    body: "Rising global temperatures pose a threat to every corner of the globe and most aspects of human life.",
    link: "/climate"
  },
  {
    key: "freshwater",
    label: "Freshwater News",
    body: "Rising consumption, climate change and pollution are increasing pressure on water supply.",
    link: "/freshwater"
  },
  {
    key: "forest",
    label: "Forest News",
    body: "Extreme events, human impact and climate change make forest ecosystems even more prone to damage.",
    link: "/forests"
  },
  {
    key: "ocean",
    label: "Ocean News",
    body: "Current pressures on the ocean’s health pose risks to our economies, societies and the environment.",
    link: "/ocean"
  },
  {
    key: "biodiversity",
    label: "Biodiveristy News",
    body: "Key natural ecosystems are heading towards tipping points with dangerous consequences for the stability of our planet.",
    link: "/biodiversity"
  }
];

export const QuickLinks = [
  {
    key: "about-us",
    label: "About Us",
    link: "/about"
  },
  {
    key: "terms-of-use",
    label: "Terms Of Use",
    link: "https://resourcewatch.org/terms-of-service",
    external: true
  },
  {
    key: "cookies",
    label: "Cookies",
    link: "https://resourcewatch.org/privacy-policy",
    external: true
  }
];

export const SocialLinks = [
  {
    key: "twitter",
    icon: TwitterIcon,
    label: "Follow us on Twitter",
    link: "https://twitter.com/globalcommonshq"
  },
  {
    key: "linkedin",
    icon: LinkedInIcon,
    label: "Follow us on LinkedIn",
    link: "https://www.linkedin.com/company/globalcommonsalliance/"
  }
];
