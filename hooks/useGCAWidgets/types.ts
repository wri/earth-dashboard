export type GCAWidget = {
  type: "Widget";
  id: number;
  attributes: {
    title: string;
    widget_id: string;
    category: string;
    order: number;
  };
};
