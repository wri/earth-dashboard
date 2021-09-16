import { render } from "@testing-library/react";
import { wrapper } from "./store";

const AllTheProviders = ({ children }) => {
  return children;
};

const customRender = (ui, options) => render(ui, { wrapper: wrapper.withRedux(AllTheProviders), ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
