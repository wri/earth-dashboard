export type DataLayer = {
  type: "DataLayer";
  id: number;
  attributes: {
    title: string;
    description: string;
    default_on: boolean;
    data_key: string;
    category: {
      type: "LayerCategory";
      id: number;
      attributes: {
        title: string;
        description: string;
      };
    };
    source: null;
  };
};

export type Mode = {
  type: "Mode";
  id: number;
  attributes: {
    title: string;
    description: string;
    icon: string;
    source: null;
    data_layers: {
      default: DataLayer[];
      available: DataLayer[];
    };
    visibility: {
      advanced_menu: boolean;
      data_highlights: boolean;
    };
  };
};

export type ModesState = {
  currentModeId?: number;
  currentMode?: Mode;
  loadDefaultModeValues: boolean;
  allModes?: Mode[];
  animationValue: string;
  datasetValue: string;
  monitorValue: string;
  heightValue: string;
  layersLabelArr: string[];
  dateOfDataShown: string;
};
