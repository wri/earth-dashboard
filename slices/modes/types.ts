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
    scale_info_detail: string;
    icon: string;
    source: null;
    sections: [
      {
        attributes: {
          icon_image_url: string;
          main_image_url: string;
          title: string;
          detail: string;
        };
      }
    ];
    data_layers: {
      default: DataLayer[];
      available: DataLayer[];
    };
    what_is_happening_content: {
      title: string;
      detail: string;
    };
    what_will_happen_content: {
      title: string;
      detail: string;
    };
    how_to_help_content: {
      title: string;
      detail: string;
    };
    visibility: {
      advanced_menu: boolean;
      data_highlights: boolean;
    };
    extreme_event_count: number;
  };
};

export type ModesState = {
  defaultModeId?: number;
  defaultMode?: Mode;
  currentModeId?: number;
  currentMode?: Mode;
  currentVisibleMode?: Mode;
  loadDefaultModeValues: boolean;
  allModes?: Mode[];
  animationValue: string;
  datasetValue: string;
  monitorValue: string;
  heightValue: string;
  layersLabelArr: string[];
  dateOfDataShown: string;
  pageTypeId: string;
  previousPageTypeId: string;
  infoMode: Mode | undefined;
  modesLoading: boolean;
};
