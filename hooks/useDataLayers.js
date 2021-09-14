import { useMemo } from "react";

// Filter data layer type
const useDataLayers = (template, dataType) => {
  const filteredLayers = useMemo(() => {
    if (template) {
      return template.attributes.data_layers.filter(layer => layer.attributes.category.attributes.title === dataType);
    }

    return [];
  }, [dataType, template]);

  return filteredLayers;
};

export default useDataLayers;
