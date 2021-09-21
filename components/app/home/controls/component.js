import classnames from "classnames";
import PropTypes from "prop-types";

const ControlsConfig = [
  {
    name: "settings",
    src: "cog.svg"
  }
];

const Controls = () => (
  <div>
    {ControlsConfig.map(control => (
      <button><img src={`/static/icons/${control.src}`} /></button>
    ))}
  </div>
);

// Controls.propTypes = {
//   isMobile: PropTypes.bool.isRequired
// };

export default Controls;
