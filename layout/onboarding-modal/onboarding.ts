import halfEarth from "public/static/images/half-earth.png";
import halfEarth2 from "public/static/images/half-earth2.png";
import threeCards from "public/static/images/three-cards.png";

interface IOnBoarding {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
}

export const data: IOnBoarding[] = [
  {
    id: 1,
    title: "The effects of human-induced climate change can be seen and felt across the planet.",
    url: halfEarth.src,
    width: halfEarth.width,
    height: halfEarth.height
  },
  {
    id: 2,
    title: "Extreme climate events worldwide have made ecosystems even more prone to damage.",
    url: halfEarth2.src,
    width: halfEarth2.width,
    height: halfEarth2.height
  },
  {
    id: 3,
    title:
      "Our partners tell the epic story of what is happening to our planet, confronting the accelerating global crisis.",
    url: threeCards.src,
    width: threeCards.width,
    height: threeCards.height
  }
];
