import { climateTopics } from "constants/news/climate";
import { forestsTopics } from "constants/news/forests";
import { oceanTopics } from "constants/news/ocean";
import { freshwaterTopcis } from "constants/news/freshwater";
import { biodiversityTopics } from "constants/news/biodiversity";

import { CLIMATE, FRESHWATER, OCEAN, FORESTS, BIODIVERSITY } from "utils/topics";

// Pluralised topics - needed for the NowThis video keywords...
export const pluralisedTopicNames = {
  [CLIMATE]: "climates",
  [FORESTS]: "forests",
  [OCEAN]: "oceans",
  [FRESHWATER]: "freshwaters",
  [BIODIVERSITY]: "biodiversities"
};

const TOPICS = {
  [CLIMATE]: climateTopics,
  [FORESTS]: forestsTopics,
  [OCEAN]: oceanTopics,
  [FRESHWATER]: freshwaterTopcis,
  [BIODIVERSITY]: biodiversityTopics
};

export default TOPICS;
