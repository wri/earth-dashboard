import Select from "react-select";
import PropTypes from "prop-types";
import { useMemo } from "react";
import Icon from "../Icon";

const theme = {
  borderRadius: 0,
  spacing: {
    baseUnit: 0,
    controlHeight: 38,
    menuGutter: 0
  }
};

const DropdownIndicator = props => {
  return <Icon name="chevron-up" style={props.getStyles("dropdownIndicator", props)} />;
};

const SelectInput = ({ isMobile, ...rest }) => {
  const styles = useMemo(() => {
    const fontStyle = {
      color: "white",
      fontSize: isMobile ? 16 : 20,
      lineHeight: isMobile ? "24px" : "30px",
      textTransform: "uppercase",
      fontWeight: 500,
      fontFamily: "Barlow Condensed"
    };

    return {
      option: (_, state) => ({
        border: 0,
        borderBottom: "2px solid #D63C00",
        background: state.isFocused ? "#D63C00" : "#38444F",
        padding: "7px 16px",
        cursor: "pointer",
        ":last-of-type": {
          borderBottom: 0
        },
        ...fontStyle
      }),
      control: (_, state) => ({
        display: "flex",
        background: "#38444F",
        borderRadius: state.menuIsOpen ? "26px 26px 0px 0px" : "26px",
        padding: isMobile ? "4px 8px 4px 16px" : "7px 8px 7px 16px",
        color: "white",
        border: state.menuIsOpen || state.isFocused ? "2px solid #D63C00" : "2px solid transparent",
        cursor: "pointer"
      }),
      singleValue: provided => ({
        ...provided,
        ...fontStyle
      }),
      indicatorSeparator: () => ({
        display: "none"
      }),
      dropdownIndicator: (_, state) => ({
        transform: state.selectProps.menuIsOpen ? "rotate(0deg)" : "rotate(180deg)",
        transition: "transform 0.3s ease-in",
        width: isMobile ? 28 : 32,
        height: isMobile ? 28 : 32
      }),
      menu: provided => ({
        ...provided,
        borderRadius: "0px 0px 26px 26px",
        overflow: "hidden",
        border: "2px solid #D63C00",
        borderTop: 0,
        "::-webkit-scrollbar": {
          display: "none"
        }
      }),
      menuList: provided => ({
        ...provided,
        "::-webkit-scrollbar": {
          display: "none"
        }
      })
    };
  }, [isMobile]);

  return (
    <Select
      styles={styles}
      theme={theme}
      components={{
        DropdownIndicator
      }}
      {...rest}
    />
  );
};

SelectInput.propTypes = {
  isMobile: PropTypes.bool
};

SelectInput.defaultProps = {
  isMobile: false
};

export default SelectInput;
