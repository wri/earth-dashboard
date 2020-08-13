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

export const WIDGET_TYPE_OPTIONS = [
  {
    label: 'Standard widget',
    value: 'standard'
  },
  {
    label: 'New widget types',
    value: 'new'
  }
];

export const DEFAULT_WIDGET_TYPE_OPTION = 'standard';

export const LIST_WIDGET_TEMPLATE = {
  type: 'widget',
  attributes: {
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
  }
};

export const COMBINED_WIDGET_TEMPLATE = {
  type: 'widget',
  attributes: {
    name: 'widget-name',
    description: 'widget-description',
    widgetConfig: {
      type: 'combined',
      combinedWidgetConfig: {
        widget1: 'ID of the first widget',
        widget2: 'ID of the second widget',
        direction: 'choose betweem the values row/column'
      }
    }
  }
};

export const DYNAMIC_TEXT_WIDGET_TEMPLATE = {
  type: 'widget',
  attributes: {
    name: 'widget-name',
    description: 'widget-description',
    widgetConfig: {
      type: 'dynamic-text',
      dynamicTextWidgetConfig: {
        text: 'Coral Reefs at risk of bleaching during the year {{year}}: {{percentage}}',
        parameters: [
          {
            key: "year",
            query: "SELECT....",
            format: "0.s"
          },
          {
            key: "percentage",
            query: "SELECT * FROM table {{where}}",
            format: "0.%"
          }
        ]
      }
    }
  }
};

export const NEW_WIDGET_TYPES_TEMPLATES = [
  {
    label: 'List',
    value: LIST_WIDGET_TEMPLATE
  },
  {
    label: 'Combined',
    value: COMBINED_WIDGET_TEMPLATE
  },
  {
    label: 'Dynamic text',
    value: DYNAMIC_TEXT_WIDGET_TEMPLATE
  }
];
