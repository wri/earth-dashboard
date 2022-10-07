import { climateTopics } from "constants/news/climate";
import { forestsTopics } from "constants/news/forests";
import { oceanTopics } from "constants/news/ocean";
import { freshwaterTopcis } from "constants/news/freshwater";
import { biodiversityTopics } from "constants/news/biodiversity";

import { CLIMATE, FRESHWATER, OCEAN, FORESTS, BIODIVERSITY } from "utils/topics";

// Pluralised topics - needed for the NowThis video keywords...
export const pluralisedTopicNames = {
  [CLIMATE]: "climates",
  [FRESHWATER]: "freshwaters",
  [FORESTS]: "forests",
  [OCEAN]: "oceans",
  [BIODIVERSITY]: "biodiversities"
};

const TOPICS = {
  [CLIMATE]: climateTopics,
  [FRESHWATER]: freshwaterTopcis,
  [FORESTS]: forestsTopics,
  [OCEAN]: oceanTopics,
  [BIODIVERSITY]: biodiversityTopics
};

export default TOPICS;
