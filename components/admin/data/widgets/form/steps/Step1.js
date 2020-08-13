import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WidgetEditor from '@widget-editor/widget-editor';
import RwAdapter from '@widget-editor/rw-adapter';

// Redux
import { connect } from 'react-redux';

// Constants
import {
  FORM_ELEMENTS,
  DEFAULT_WIDGET_TYPE_OPTION,
  WIDGET_TYPE_OPTIONS
} from 'components/admin/data/widgets/form/constants';

// Components
import Field from 'components/form/Field';
import Select from 'components/form/SelectInput';
import Checkbox from 'components/form/Checkbox';
import RadioGroup from 'components/form/RadioGroup';

// Utils
import DefaultTheme from 'utils/widgets/theme';

// Constants
import { NEW_WIDGET_TYPES_TEMPLATES, LIST_WIDGET_TEMPLATE } from '../constants';

class Step1 extends Component {
  static propTypes = {
    id: PropTypes.string,
    user: PropTypes.object.isRequired,
    form: PropTypes.object,
    datasets: PropTypes.array,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    query: PropTypes.object.isRequired
  };

  state = {
    id: this.props.id,
    form: this.props.form,
    showNewWidgetsInterface: false,
    newWidgetTypesEditorCode: JSON.stringify(LIST_WIDGET_TEMPLATE, null, 5)
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      form: {
        ...nextProps.form,
        dataset: nextProps.form.dataset || nextProps.query.dataset
      }
    });
  }

  onWidgetTypeChange = (value) => {
    this.setState({ showNewWidgetsInterface: value === 'new' });
  }

  onWidgetTypeTemplateChange = (event) => {
    this.setState({
      newWidgetTypesEditorCode: event.target.value,
    });
  }

  render() {
    const { id, showNewWidgetsInterface, newWidgetTypesEditorCode } = this.state;
    const { user, query } = this.props;
    const datasetSelected = this.state.form.dataset;

    // Reset FORM_ELEMENTS
    FORM_ELEMENTS.elements = {};

    return (
      <fieldset className="c-field-container">
        <fieldset className="c-field-container">
          {/* DATASET */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.dataset = c; }}
            onChange={value => this.props.onChange({
              dataset: value
            })}
            validations={['required']}
            className="-fluid"
            options={this.props.datasets}
            properties={{
              name: 'dataset',
              label: 'Dataset',
              default: query.dataset,
              value: this.state.form.dataset || query.dataset,
              disabled: !!id,
              required: true,
              instanceId: 'selectDataset'
            }}
          >
            {Select}
          </Field>

          {(user.role === 'ADMIN') &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.env = c; }}
              hint={'Choose "preproduction" to see this dataset it only as admin, "production" option will show it in public site.'}
              className="-fluid"
              options={[{ label: 'Pre-production', value: 'preproduction' }, { label: 'Production', value: 'production' }]}
              onChange={value => this.props.onChange({ env: value })}
              properties={{
                name: 'env',
                label: 'Environment',
                placeholder: 'Please select an environment',
                default: 'preproduction',
                value: this.props.form.env
              }}
            >
              {Select}
            </Field>}

          {/* PUBLISHED */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.published = c; }}
            onChange={value => this.props.onChange({ published: value.checked })}
            properties={{
              name: 'published',
              label: 'Do you want to set this widget as published?',
              value: 'published',
              title: 'Published',
              checked: this.props.form.published
            }}
          >
            {Checkbox}
          </Field>

          {/* DEFAULT */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.default = c; }}
            onChange={value => this.props.onChange({ default: value.checked })}
            properties={{
              name: 'default',
              label: 'Do you want to set this widget as default?',
              value: 'default',
              title: 'Default',
              checked: this.props.form.default
            }}
          >
            {Checkbox}
          </Field>

          {/* DEFAULT EDITABLE WIDGET */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.defaultEditableWidget = c; }}
            onChange={value => this.props.onChange({ defaultEditableWidget: value.checked })}
            properties={{
              name: 'defaultEditableWidget',
              label: 'Do you want to set this widget as the default editable widget?',
              value: 'defaultEditableWidget',
              title: 'Default editable widget',
              checked: this.props.form.defaultEditableWidget
            }}
          >
            {Checkbox}
          </Field>
          <div className="widget-type-radio-group">
            <label className="label">Choose a widget type:</label>
            <RadioGroup
              name="show-new-widget-types-interface"
              properties={{ default: DEFAULT_WIDGET_TYPE_OPTION }}
              options={WIDGET_TYPE_OPTIONS}
              onChange={this.onWidgetTypeChange}
            />
          </div>
        </fieldset>

        {datasetSelected && !showNewWidgetsInterface &&
          <WidgetEditor
            datasetId={this.state.form.dataset}
            {...(id && { widgetId: id })}
            application="rw"
            onSave={this.props.onSave}
            theme={DefaultTheme}
            adapter={RwAdapter}
            authenticated={true}
            compact={false}
          />
        }
        {datasetSelected && showNewWidgetsInterface &&
          <div className="new-widget-types-container">
            <div className="template-select-container">
              <label className="label">Choose a template:</label>
              <select onChange={this.onWidgetTypeTemplateChange}>
                {NEW_WIDGET_TYPES_TEMPLATES.map(elem =>
                  <option
                    key={elem.label}
                    value={JSON.stringify(elem.value, null, 5)}
                  >
                    {elem.label}
                  </option>
                )}
              </select>
            </div>
            <div className="json-editor-container">
              <textarea
                className="json-editor"
                onChange={event => this.setState({ newWidgetTypesEditorCode: event.target.value })}
                value={newWidgetTypesEditorCode}
              />
              <div className="widget-preview">

              </div>
            </div>
            <div className="buttons-container">
              <button
                className="c-button -primary"
                onClick={() => this.props.onSave(JSON.parse(newWidgetTypesEditorCode))}
              >
                Save
              </button>
            </div>
          </div>
        }
      </fieldset>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  query: state.routes.query
});

export default connect(mapStateToProps, null)(Step1);
