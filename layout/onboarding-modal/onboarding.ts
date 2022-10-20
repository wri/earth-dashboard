import halfEarth from "public/static/images/half-earth.png";
import halfEarth2 from "public/static/images/half-earth2.png";
import threeCards from "public/static/images/three-cards.png";

import halfEarthShadow from "/public/static/images/half-earth-shadow.png";
import halfEarth2Shadow from "/public/static/images/half-earth2-shadow.png";
import threeCardsShadow from "/public/static/images/three-cards-shadow.png";

interface IOnBoarding {
  id: number;
  title: string;
  desktopURL: string;
  mobileURL: string;
  width: number;
  height: number;
}

export const data: IOnBoarding[] = [
  {
    id: 1,
    title: "The impacts of the climate emergency can be seen and felt across the planet. Earth HQ is tracking them.",
    desktopURL: halfEarth.src,
    mobileURL: halfEarthShadow.src,
    width: halfEarth.width,
    height: halfEarth.height
  },
  {
    id: 2,
    title:
      "Discover the latest extreme events. Share them to mobilize responses to fix the damage. Or explore the data yourself.",
    desktopURL: halfEarth2.src,
    mobileURL: halfEarth2Shadow.src,
    width: halfEarth2.width,
    height: halfEarth2.height
  },
  {
    id: 3,
    title:
      "Earth HQ reveals the epic planet-scale story of climate change with news from Mongabay's global network of reporters.",
    desktopURL: threeCards.src,
    mobileURL: threeCardsShadow.src,
    width: threeCards.width,
    height: threeCards.height
  }
];
