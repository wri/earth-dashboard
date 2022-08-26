export type Timeline = {
  end: string;
  frequency: {
    hours: number;
  };
  start: string;
  type: "recurring_interval";
};

export type Unit = {
  convention: string;
  precision: number;
  symbol: string;
  symbolHTML: string;
  type: "quantity";
};

export type EarthLayer = {
  type: "animation" | "overlay" | "annotation";
  product: {
    name: string;
    source: string;
    description: string;
    validTime: string;
    units: Record<string, Unit>;
    timeline: Timeline[];
    nav?: {
      next1: string;
      next2: string;
      prev1: string;
      prev2: string;
    };
    supportedLevels?: string[];
    scale: {
      type: "linear";
      range: Record<string, number[]>;
      colours: Record<string, number>;
    };
  };
};
