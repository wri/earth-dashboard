import { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// components
import Field from "components/form/Field";
import Input from "components/form/Input";
import Checkbox from "components/form/checkbox";

// styles
import styles from "./step-widget-metadata-form.module.scss";

// constants
import { FORM_ELEMENTS } from "components/widgets/metadata/form/constants";

class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      widgetLinksSelected: props.form.info.widgetLinks && props.form.info.widgetLinks.length > 0,
      form: props.form
    };

    // ------------------------- Bindings ----------------------------
    this.onWidgetLinkChange = this.onWidgetLinkChange.bind(this);
    this.onWidgetLinksCheckboxChange = this.onWidgetLinksCheckboxChange.bind(this);
    this.handleRemoveWidgetLink = this.handleRemoveWidgetLink.bind(this);
    this.handleAddWidgetLink = this.handleAddWidgetLink.bind(this);
    // ---------------------------------------------------------------
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      widgetLinksSelected: nextProps.form.info.widgetLinks && nextProps.form.info.widgetLinks.length > 0,
      form: nextProps.form
    });
  }

  /**
   * UI EVENTS
   * - onWidgetLinkChange
   * - onWidgetLinksCheckboxChange
   * - handleRemoveWidgetLink
   * - handleAddWidgetLink
   */
  onWidgetLinkChange(obj) {
    const widgetLinks = this.props.form.info.widgetLinks.slice(0);
    const index = widgetLinks.findIndex(elem => elem.id === obj.id);
    widgetLinks[index] = {
      ...widgetLinks[index],
      ...obj
    };
    this.props.onChange({ info: Object.assign({}, this.state.form.info, { widgetLinks }) });
  }
  onWidgetLinksCheckboxChange(checked) {
    this.setState({ widgetLinksSelected: checked });
    let newWidgetLinks = [];
    if (checked) {
      newWidgetLinks = [{ name: "", link: "", id: Date.now() }];
    }
    this.props.onChange({
      info: Object.assign({}, this.state.form.info, { widgetLinks: newWidgetLinks })
    });
  }
  handleRemoveWidgetLink(id) {
    const widgetLinks = this.props.form.info.widgetLinks.slice(0);
    const index = widgetLinks.findIndex(s => s.id === id);
    widgetLinks.splice(index, 1);
    this.props.onChange({ info: Object.assign({}, this.state.form.info, { widgetLinks }) });
  }

  handleAddWidgetLink() {
    const widgetLinks = this.props.form.info.widgetLinks.slice(0);
    widgetLinks.push({ name: "", link: "", id: Date.now() });
    this.props.onChange({ info: Object.assign({}, this.state.form.info, { widgetLinks }) });
  }

  render() {
    const { widgetLinksSelected, form } = this.state;
    const { info } = form;

    return (
      <div className={styles["c-step-widget-metadata-form"]}>
        <fieldset className="c-field-container">
          <h4>Edit metadata</h4>
          {/* CAPTION */}
          <Field
            ref={c => {
              if (c) FORM_ELEMENTS.elements.caption = c;
            }}
            onChange={value =>
              this.props.onChange({
                info: {
                  ...this.state.form.info,
                  caption: value
                }
              })
            }
            className="-fluid"
            properties={{
              name: "caption",
              label: "Caption",
              type: "text",
              default: this.state.form.info.caption,
              value: this.state.form.info.caption
            }}
          >
            {Input}
          </Field>
          {/* HIGHLIGHTED */}
          <Field
            ref={c => {
              if (c) FORM_ELEMENTS.elements.highlighted = c;
            }}
            onChange={value =>
              this.props.onChange({
                info: {
                  ...this.state.form.info,
                  highlighted: value.checked
                }
              })
            }
            properties={{
              name: "highlighted",
              title: "Highlighted",
              checked: info.highlighted
            }}
          >
            {Checkbox}
          </Field>
          {/* ARCHIVED */}
          <Field
            ref={c => {
              if (c) FORM_ELEMENTS.elements.archived = c;
            }}
            onChange={value =>
              this.props.onChange({
                info: {
                  ...this.state.form.info,
                  archived: value.checked
                }
              })
            }
            properties={{
              name: "archived",
              title: "Archived",
              checked: info.archived
            }}
          >
            {Checkbox}
          </Field>
          {/*
           *****************************************************
           ****************** WIDGET LINKS *********************
           *****************************************************
           */}
          <div className={styles["widget-links-container"]}>
            <Field
              ref={c => {
                if (c) FORM_ELEMENTS.elements.widget_links = c;
              }}
              onChange={value => this.onWidgetLinksCheckboxChange(value.checked)}
              properties={{
                name: "widget_links",
                title: "Widget links",
                checked: info.widgetLinks && info.widgetLinks.length > 0
              }}
            >
              {Checkbox}
            </Field>
            {widgetLinksSelected && (
              <div>
                {this.state.form.info.widgetLinks.map((elem, index) => (
                  <div className="c-field-row" key={elem.id}>
                    <div className="l-row row">
                      <div className="column small-3">
                        <Field
                          ref={c => {
                            if (c) FORM_ELEMENTS.elements.widgetLinkName = c;
                          }}
                          onChange={value =>
                            this.onWidgetLinkChange({
                              name: value,
                              id: elem.id
                            })
                          }
                          validations={["required"]}
                          className="-fluid"
                          properties={{
                            name: "widgetLinkName",
                            label: "Name",
                            type: "text",
                            default: elem.name,
                            required: true
                          }}
                        >
                          {Input}
                        </Field>
                      </div>
                      <div className="column small-6">
                        <Field
                          ref={c => {
                            if (c) FORM_ELEMENTS.elements.widgetLinkLink = c;
                          }}
                          onChange={value => this.onWidgetLinkChange({ link: value, id: elem.id })}
                          validations={["required", "url"]}
                          className="-fluid"
                          properties={{
                            name: "widgetLinkLink",
                            label: "Link",
                            type: "text",
                            default: elem.link,
                            required: true
                          }}
                        >
                          {Input}
                        </Field>
                      </div>
                      <div
                        className={classnames({
                          "column small-3": true,
                          [styles["remove-widget-link-container"]]: true
                        })}
                      >
                        <button
                          type="button"
                          className="c-button -secondary -fullwidth"
                          onClick={() => this.handleRemoveWidgetLink(elem.id)}
                          disabled={this.state.form.info.widgetLinks.length > 1 && index === 0}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="c-field-row">
                  <div className="l-row row">
                    <div
                      className={classnames({
                        "column small-12": true,
                        [styles["add-widget-link-container"]]: true
                      })}
                    >
                      <button
                        type="button"
                        className="c-button -secondary -fullwidth"
                        onClick={this.handleAddWidgetLink}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </fieldset>
      </div>
    );
  }
}

Step1.propTypes = {
  form: PropTypes.object,
  onChange: PropTypes.func
};

export default Step1;
