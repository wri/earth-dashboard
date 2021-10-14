import { climateTopics } from "constants/news/climate";
import { forestsTopics } from "constants/news/forests";
import { oceanTopics } from "constants/news/ocean";
import { freshwaterTopcis } from "constants/news/freshwater";

import { CLIMATE, FRESHWATER, OCEAN, FORESTS } from "utils/topics";

const topics = {
  [CLIMATE]: climateTopics,
  [FORESTS]: forestsTopics,
  [OCEAN]: oceanTopics,
  [FRESHWATER]: freshwaterTopcis
};

export default topics;
