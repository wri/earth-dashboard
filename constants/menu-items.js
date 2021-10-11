import EarthHQImage from "public/static/images/earth-hq.png";
import TwitterIcon from "public/static/icons/twitter.svg";
import LinkedInIcon from "public/static/icons/linkedin.svg";

export const MenuItems = [
  {
    key: "earth-hq",
    image: EarthHQImage,
    label: "Earth HQ",
    body: "A “Situation Room” for the planet. Earth HQ is an interactive and dynamic platform that tracks the forces imperiling the natural systems that support life on earth. ",
    link: "/"
  },
  {
    key: "climate",
    label: "Climate",
    body: "Rising global temperatures pose a threat to every corner of the globe and most aspects of human life.",
    link: "/climate"
  },
  {
    key: "freshwater",
    label: "Freshwater",
    body: "Rising consumption, climate change and pollution are increasing pressure on water supply. ",
    link: "/freshwater"
  },
  {
    key: "forest",
    label: "Forest",
    body: "Extreme events and climate change make forest ecosystems even more prone to damage.",
    link: "/forests"
  },
  {
    key: "qcean",
    label: "Ocean",
    body: "Current pressures on the ocean’s health pose risks to our economies, societies and the environment.",
    link: "/ocean"
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
