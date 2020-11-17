export const FORM_ELEMENTS = {
  elements: {},
  validate() {
    const { elements } = this;
    Object.keys(elements).forEach((k) => {
      elements[k].validate();
    });
  },
  isValid() {
    const { elements } = this;
    const valid = Object.keys(elements)
      .map(k => elements[k].isValid())
      .filter(v => v !== null)
      .every(element => element);

    return valid;
  }
};

export const WIDGET_TYPE_STANDARD = 'standard';
export const WIDGET_TYPE_NEW = 'new';
export const WIDGET_TYPE_OPTIONS = [
  {
    label: 'Standard widget',
    value: WIDGET_TYPE_STANDARD
  },
  {
    label: 'New widget types',
    value: WIDGET_TYPE_NEW
  }
];

export const DEFAULT_WIDGET_TYPE_OPTION = 'standard';

export const LIST_WIDGET_TYPE = 'list';
export const STATIC_LIST_WIDGET_TYPE = "static-list";
export const COMBINED_WIDGET_TYPE = 'combined';
export const DYNAMIC_TEXT_WIDGET_TYPE = 'dynamic-text';
export const STATIC_TEXT_WIDGET_TYPE = 'static-text';
export const NEWS_WIDGET_TYPE = 'news';
export const NEW_WIDGET_TYPES = [
  LIST_WIDGET_TYPE,
  STATIC_LIST_WIDGET_TYPE,
  COMBINED_WIDGET_TYPE,
  DYNAMIC_TEXT_WIDGET_TYPE,
  STATIC_TEXT_WIDGET_TYPE,
  NEWS_WIDGET_TYPE
];

export const NEWS_WIDGET_TEMPLATE = {
  type: 'widget',
  name: 'Test news widget',
  description: 'widget-description',
  widgetConfig: {
    type: 'news',
    newsWidgetConfig: {
      url: 'https://news.mongabay.com/2020/09/crisis-in-venezuela-non-governmental-organizations-adapt-to-survive/feed/',
      type: 'mongabay'
    }
  }
};

export const LIST_WIDGET_TEMPLATE = {
  type: 'widget',
  name: 'Test widget list',
  description: 'widget-description',
  widgetConfig: {
    type: 'list',
    listWidgetConfig: {
      heading: 'These are the first 5 values for land temperature: ',
      query: 'https://api.resourcewatch.org/v1/query/47dc1a1b-2c91-4d69-b04e-ea8c4561e2b5?sql=SELECT date as key , no_smoothing as value FROM cli_044_global_land_temperature ORDER BY no_smoothing desc LIMIT 5',
      format: '0.2s',
      bullets: false,
      numbers: true,
      source: {
        prefix: {
          label: "Dataset name",
          link: "https://... "
        },
        suffix: {
          label: "Source name",
          link: "https://...."
        }
      }
    }
  }
};

export const STATIC_LIST_WIDGET_TEMPLATE = {
  type: 'widget',
  name: 'Test widget static list',
  description: 'widget-description',
  widgetConfig: {
    type: 'static-list',
    staticListWidgetConfig: {
      bullets: false,
      numbers: true,
      values: [
        {
          label: 'Element 1',
          style: {
            fontWeight: 800,
            color: 'green',
            fontSize: 17
          }
        },
        {
          label: 'Element 2',
          link: 'http://.....',
          style: {
            textDecoration: 'underline'
          }
        },
        {
          label: 'Element 3'
        },
        {
          label: 'Element 4'
        },
        {
          label: 'Element 5'
        }
      ],
      source: {
        prefix: {
          label: "Dataset name",
          link: "https://... "
        },
        suffix: {
          label: "Source name",
          link: "https://...."
        }
      }
    }
  }
};

export const COMBINED_WIDGET_TEMPLATE = {
  type: 'widget',
  name: 'widget-name',
  description: 'widget-description',
  widgetConfig: {
    type: 'combined',
    combinedWidgetConfig: {
      widget1: {
        id: 'ID of the first widget',
        percentage: 50
      },
      widget2: {
        id: 'ID of the second widget',
        percentage: 50
      },
      direction: 'choose betweem the values row/column',
      source: {
        prefix: {
          label: "Dataset name",
          link: "https://... "
        },
        suffix: {
          label: "Source name",
          link: "https://...."
        }
      }
    }
  }
};

export const DYNAMIC_TEXT_WIDGET_TEMPLATE = {
  type: 'widget',
  name: 'widget-name',
  description: 'widget-description',
  widgetConfig: {
    type: 'dynamic-text',
    dynamicTextWidgetConfig: {
      text: 'Coral Reefs at risk of bleaching during the year {{date}}: {{value}}',
      parameters: [
        {
          key: 'date',
          query: 'https://api.resourcewatch.org/v1/query/47dc1a1b-2c91-4d69-b04e-ea8c4561e2b5?sql=SELECT date FROM cli_044_global_land_temperature ORDER BY no_smoothing desc LIMIT 1',
          outputFormat: '%B %d, %Y',
          inputFormat: '%Y-%m-%d',
          type: 'date',
          style: {
            'fontWeight': 800,
            color: 'blue',
            'fontSize': 28
          }
        },
        {
          key: 'value',
          query: 'https://api.resourcewatch.org/v1/query/47dc1a1b-2c91-4d69-b04e-ea8c4561e2b5?sql=SELECT no_smoothing as value FROM cli_044_global_land_temperature ORDER BY no_smoothing desc LIMIT 1',
          format: '.^20',
          type: 'number',
          style: {
            'fontStyle': 'italic',
            'textDecoration': 'underline'
          }
        }
      ],
      source: {
        prefix: {
          label: "Dataset name",
          link: "https://... "
        },
        suffix: {
          label: "Source name",
          link: "https://...."
        }
      }
    }
  }
};

export const STATIC_TEXT_WIDGET_TEMPLATE = {
  type: 'widget',
  name: 'widget-name',
  description: 'widget-description',
  widgetConfig: {
    type: 'static-text',
    staticTextWidgetConfig: {
      text: '{{2 billion hectares}} of degraded and deforested land worldwide could be restored, an area larger than South America',
      parameters: [
        {
          key: '2 billion hectares',
          style: {
            'fontStyle': 'italic',
            'fontWeight': 'bold',
            color: '#009A67'
          }
        }
      ],
      source: {
        prefix: {
          label: "Dataset name",
          link: "https://... "
        },
        suffix: {
          label: "Source name",
          link: "https://...."
        }
      }
    }
  }
};

export const NEW_WIDGET_TYPES_TEMPLATES = [
  {
    id: LIST_WIDGET_TYPE,
    value: LIST_WIDGET_TEMPLATE
  },
  {
    id: STATIC_LIST_WIDGET_TYPE,
    value: STATIC_LIST_WIDGET_TEMPLATE
  },
  {
    id: COMBINED_WIDGET_TYPE,
    value: COMBINED_WIDGET_TEMPLATE
  },
  {
    id: DYNAMIC_TEXT_WIDGET_TYPE,
    value: DYNAMIC_TEXT_WIDGET_TEMPLATE
  },
  {
    id: STATIC_TEXT_WIDGET_TYPE,
    value: STATIC_TEXT_WIDGET_TEMPLATE
  },
  {
    id: NEWS_WIDGET_TYPE,
    value: NEWS_WIDGET_TEMPLATE
  }
];

export const NEW_WIDGET_TYPES_OPTIONS = [
  {
    label: 'List',
    value: LIST_WIDGET_TYPE
  },
  {
    label: 'Static list',
    value: STATIC_LIST_WIDGET_TYPE
  },
  {
    label: 'Combined',
    value: COMBINED_WIDGET_TYPE
  },
  {
    label: 'Dynamic text',
    value: DYNAMIC_TEXT_WIDGET_TYPE
  },
  {
    label: 'Static text',
    value: STATIC_TEXT_WIDGET_TYPE
  },
  {
    label: 'News',
    value: NEWS_WIDGET_TYPE
  }
];
