import { useMemo } from "react";

// Filter data layer type
const useDataLayers = (template, dataType) => {
  const filteredLayers = useMemo(() => {
    if (template) {
      return [...template.attributes.data_layers.available, ...template.attributes.data_layers.default].filter(
        layer => layer.attributes.category.attributes.title === dataType
      );
    }

    return [];
  }, [dataType, template]);

  return filteredLayers;
};

export default useDataLayers;
