import Select from 'react-select';

const StyledSelect = () => {
  const defaultStyles = {
    
  };

  const desktopStyles = {
    ...defaultStyles
  }

  return (
    <Select
      styles={desktopStyles}
      options={}
    />
  );
};

export default StyledSelect;
