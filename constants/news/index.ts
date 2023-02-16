import { climateTopics } from "constants/news/climate";
import { forestsTopics } from "constants/news/forests";
import { oceanTopics } from "constants/news/ocean";
import { freshwaterTopcis } from "constants/news/freshwater";
import { biodiversityTopics } from "constants/news/biodiversity";
import { indigenousTopics } from "./indigenous";

import { CLIMATE, FRESHWATER, OCEAN, FORESTS, BIODIVERSITY, INDIGENOUS } from "utils/topics";

// Pluralised topics - needed for the NowThis video keywords...
export const pluralisedTopicNames = {
  [CLIMATE]: "climates",
  [FRESHWATER]: "freshwaters",
  [BIODIVERSITY]: "biodiversities",
  [OCEAN]: "oceans",
  [FORESTS]: "forests",
  [INDIGENOUS]: "indigenous"
};

const TOPICS = {
  [CLIMATE]: climateTopics,
  [FRESHWATER]: freshwaterTopcis,
  [BIODIVERSITY]: biodiversityTopics,
  [OCEAN]: oceanTopics,
  [FORESTS]: forestsTopics,
  [INDIGENOUS]: indigenousTopics
};

export default TOPICS;
