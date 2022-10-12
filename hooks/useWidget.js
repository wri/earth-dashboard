import { useEffect, useState } from "react";
import { fetchWidget } from "services/widget";

const useWidget = (widget, widgetShouldBeLoaded) => {
  const [widgetData, setWidgetData] = useState({
    loading: widgetShouldBeLoaded,
    id: widget.id,
    data: widgetShouldBeLoaded ? null : widget
  });

  useEffect(() => {
    const loadWidget = async () => {
      try {
        const res = await fetchWidget(widget.id, { includes: "metadata" });
        if (!res.id) return;
        setWidgetData({
          id: res.id,
          loading: false,
          data: res
        });
      } catch (err) {
        console.error(`Error loading widget: ${widget.id} - ${err}`);
      }
    };

    if (widgetShouldBeLoaded) {
      loadWidget();
    }
  }, [widget.id, widgetShouldBeLoaded]);

  return widgetData;
};

export default useWidget;
