import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import styles from "./control-bar.module.scss";

const ControlBtn = props => {
  const dispatch = useDispatch();

  const { id, src, isActiveSelector, setActive, setInactive } = props.control;

  const isActive = useSelector(isActiveSelector);

  const handleOnClick = () => {
    if (isActive) {
      dispatch(setInactive());
    } else {
      dispatch(setActive());
    }
  };

  return (
    <button key={id} className={classnames(styles["c-control-btn"])} onClick={handleOnClick}>
      <img src={`/static/icons/${src}`} width="48px" height="48px" />
    </button>
  );
};

const ControlBar = ({ controls }) => (
  <div className={classnames(styles["c-control-bar-container"])}>
    {controls.map(control => (
      <ControlBtn control={control} />
    ))}
  </div>
);

export default ControlBar;
