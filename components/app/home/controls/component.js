import classnames from "classnames";
import styles from "./controls.module.scss";

const ControlsConfig = [
  {
    id: "settings",
    name: "settings",
    src: "cog.svg"
  }
];

const Controls = () => (
  <div className={classnames(styles["c-controls-container"])}>
    {ControlsConfig.map(control => (
      <button key={control.key} className={classnames(styles["c-control-btn"])}><img src={`/static/icons/${control.src}`} width="48px" height="48px" /></button>
    ))}
  </div>
);

export default Controls;
