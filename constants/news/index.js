import { climateTopics } from "constants/news/climate";
import { forestsTopics } from "constants/news/forests";
import { oceanTopics } from "constants/news/ocean";
import { freshwaterTopcis } from "constants/news/freshwater";
import { biodiversityTopics } from "constants/news/biodiversity";

import { CLIMATE, FRESHWATER, OCEAN, FORESTS, BIODIVERSITY } from "utils/topics";

const topics = {
  [CLIMATE]: climateTopics,
  [FORESTS]: forestsTopics,
  [OCEAN]: oceanTopics,
  [FRESHWATER]: freshwaterTopcis,
  [BIODIVERSITY]: biodiversityTopics
};

export default topics;
