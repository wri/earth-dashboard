export const makeMapWidgetConfigCompatibleWithLeaflet = widgetConfig => ({
  ...widgetConfig,
  ...(widgetConfig.bbox && {
    bbox: [widgetConfig.bbox[1], widgetConfig.bbox[0], widgetConfig.bbox[3], widgetConfig.bbox[2]]
  })
});
