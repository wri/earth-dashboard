/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import Select from "react-select";
import chevronUpIcon from "public/static/icons/orange-chevron-up.svg";
console.log(chevronUpIcon);
// styles
// import styles from "./select.module.scss";

const fontStyle = {
  color: "white",
  fontSize: 20,
  lineHeight: "30px",
  textTransform: "uppercase",
  fontWeight: 500,
  fontFamily: "Barlow Condensed"
};

const styles = {
  option: (provided, state) => ({
    border: 0,
    borderBottom: "2px solid #D63C00",
    background: state.isFocused ? "#D63C00" : "#38444F",
    padding: "7px 16px",
    cursor: "pointer",
    ...fontStyle
  }),
  control: (provided, state) => {
    // none of react-select's styles are passed to <Control />
    // console.log(provided, state);
    return {
      display: "flex",
      background: "#38444F",
      borderRadius: state.menuIsOpen ? "26px 26px 0px 0px" : "26px",
      padding: "7px 8px 7px 16px",
      color: "white",
      border: state.menuIsOpen || state.isFocused ? "2px solid #D63C00" : "2px solid transparent"
    };
  },
  singleValue: (provided, state) => {
    return {
      ...provided,
      ...fontStyle,
      cursor: "pointer"
    };
  },
  indicatorSeparator: () => {
    return {
      display: "none"
    };
  },
  dropdownIndicator: (provided, state) => {
    console.log(state);
    return {
      transform: state.selectProps.menuIsOpen ? "rotate(0deg)" : "rotate(180deg)",
      transition: "transform 0.3s ease-in"
    };
  },
  menu: (provided, state) => {
    console.log(state);
    return {
      borderRadius: "0px 0px 26px 26px",
      overflow: "hidden",
      border: "2px solid #D63C00"
    };
  }
};

const theme = {
  borderRadius: 0,
  spacing: {
    baseUnit: 0,
    controlHeight: 38,
    menuGutter: 0
  }
};

const DropdownIndicator = props => {
  console.log(props);
  return <img src={chevronUpIcon.src} role="presentation" alt="" style={props.getStyles("dropdownIndicator", props)} />;
};

const SelectInput = props => {
  return (
    <Select
      styles={styles}
      theme={theme}
      defaultMenuIsOpen
      components={{
        DropdownIndicator
      }}
      {...props}
    />
  );
};

export default SelectInput;
