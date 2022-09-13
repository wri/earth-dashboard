import { Mode } from "slices/modes";

export type Headline = {
  type: "ClimateAlert";
  id: number;
  attributes: {
    title: string;
    summary: string;
    thumbnail_image: string;
    climate_alert_date: string;
    content: {
      body: string;
      media: {
        widget: null;
        body_image: string | null;
      };
      article_url: string;
    };
    location: {
      name: string;
      lat: number;
      lng: number;
    };
    zoom_level: number;
    mode: Mode;
  };
};

export type HeadlinesState = {
  headlines: Headline[];
  currentHeadline?: Headline;
  currentHeadlineId?: number;
};
