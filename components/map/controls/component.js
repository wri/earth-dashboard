import { Children, isValidElement, cloneElement, PureComponent } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// styles
import "./map-controls.module.scss";

class MapControls extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    customClass: PropTypes.string
  };

  static defaultProps = { customClass: null };

  render() {
    const { customClass, children } = this.props;
    const componentClass = classnames({
      [styles["c-map-controls"]]: true,
      [customClass]: !!customClass
    });

    return (
      <div className={componentClass}>
        <ul className="map-controls--list">
          {Children.map(
            children,
            (c, i) =>
              isValidElement(c) && (
                <li className="map-controls--list-item" key={i}>
                  {cloneElement(c)}
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
}

export default MapControls;
