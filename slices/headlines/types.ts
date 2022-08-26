import { Mode } from "slices/modes";

export type Headline = {
  id: number;
  type: string;
  attributes: {
    climate_alert_date: string;
    content: {};
    location: {};
    mode: Mode;
    title: string;
    summary: string;
    thumbnail_image: string;
    zoom_level: number;
  };
};

export type HeadlinesState = {
  headlines: Headline[];
  currentHeadline?: Headline;
  currentHeadlineId?: number;
};
