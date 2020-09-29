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
export const COMBINED_WIDGET_TYPE = 'combined';
export const DYNAMIC_TEXT_WIDGET_TYPE = 'dynamic-text';
export const NEWS_WIDGET_TYPE = 'news';
export const NEW_WIDGET_TYPES = [
  LIST_WIDGET_TYPE,
  COMBINED_WIDGET_TYPE,
  DYNAMIC_TEXT_WIDGET_TYPE,
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
      numbers: true
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
      direction: 'choose betweem the values row/column'
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
      text: 'Coral Reefs at risk of bleaching during the year {{year}}: {{percentage}}',
      parameters: [
        {
          key: 'date',
          query: 'https://api.resourcewatch.org/v1/query/47dc1a1b-2c91-4d69-b04e-ea8c4561e2b5?sql=SELECT date FROM cli_044_global_land_temperature ORDER BY no_smoothing desc LIMIT 1',
          outputFormat: '%B %d, %Y',
          inputFormat: '%Y-%m-%d',
          type: 'date',
          style: {
            'font-weight': 800,
            color: 'blue',
            'font-size': 28,
            'text-shadow': '4px 4px 5px #afcfdb'
          }
        },
        {
          key: 'value',
          query: 'https://api.resourcewatch.org/v1/query/47dc1a1b-2c91-4d69-b04e-ea8c4561e2b5?sql=SELECT no_smoothing as value FROM cli_044_global_land_temperature ORDER BY no_smoothing desc LIMIT 1',
          format: '.^20',
          type: number,
          style: {
            'font-style': 'italic',
            'text-decoration': 'underline'
          }
        }
      ]
    }
  }
};

export const NEW_WIDGET_TYPES_TEMPLATES = [
  {
    id: LIST_WIDGET_TYPE,
    value: LIST_WIDGET_TEMPLATE
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
    label: 'Combined',
    value: COMBINED_WIDGET_TYPE
  },
  {
    label: 'Dynamic text',
    value: DYNAMIC_TEXT_WIDGET_TYPE
  },
  {
    label: 'News',
    value: NEWS_WIDGET_TYPE
  }
];
