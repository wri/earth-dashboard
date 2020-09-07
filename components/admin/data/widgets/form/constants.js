export const STATE_DEFAULT = {
  step: 1,
  stepLength: 1,
  submitting: false,
  loading: false,
  partners: [],
  form: {
    // STEP 1
    application: [process.env.APPLICATIONS],
    dataset: null,
    source: '',
    sourceUrl: '',
    authors: '',
    default: false,
    published: false
  }
};

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
export const NEW_WIDGET_TYPES = [LIST_WIDGET_TYPE, COMBINED_WIDGET_TYPE, DYNAMIC_TEXT_WIDGET_TYPE];

export const LIST_WIDGET_TEMPLATE = {
  type: 'widget',
  name: 'widget-name',
  description: 'widget-description',
  widgetConfig: {
    type: 'list',
    listWidgetConfig: {
      heading: 'this-is-the-heading-of-the-list',
      query: 'enter the data query here',
      format: '0.2s',
      bullets: true,
      numbers: false
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
          key: 'year',
          query: 'SELECT....',
          format: '0.s'
        },
        {
          key: 'percentage',
          query: 'SELECT * FROM table {{where}}',
          format: '0.%'
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
  }
];
