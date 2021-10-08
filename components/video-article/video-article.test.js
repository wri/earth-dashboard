/* eslint-disable react/display-name */
import React from "react";
import { render, fireEvent } from "test-utils";
import VideoArticle from "./component";
import { CSSTransition } from "react-transition-group";
import ReactPlayer from "react-player";

jest.mock("react-transition-group", () => {
  return {
    CSSTransition: jest.fn(({ children }) => children)
  };
});

jest.mock("next/image", () => () => <img />);

// Here I needed to mock a react component and call one of its props within a useEffect
// Found the solution in this article: https://ericdcobb.medium.com/advanced-react-component-mocks-with-jest-and-react-testing-library-f1ae8838400b
const MockReactPlayer = ({ url, onError }) => {
  React.useEffect(() => {
    if (url !== "validURL") {
      onError();
    }
  }, [url, onError]);

  return null;
};
// Mocking an es6 module then mocking its implementation later
// see beforeAll()
jest.mock("react-player", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn()
}));

describe("Video Article", () => {
  const context = expect.any(Object);
  const children = expect.any(Object);
  const defaultCSSTransitionProps = { appear: true, children };
  const defaultReactPlayerProps = { controls: true, onError: expect.any(Function) };

  beforeAll(() => {
    ReactPlayer.mockImplementation(MockReactPlayer);
  });

  test("requests to play video on button click", () => {
    const { queryByLabelText } = render(<VideoArticle title="Test" duration="1:30" image={{}} videoURL="validURL" />);

    // Has the Thumbnail Appeared?
    expect(CSSTransition).toHaveBeenLastCalledWith(
      expect.objectContaining({ in: true, ...defaultCSSTransitionProps }),
      context
    );
    // In which case the Play Button should be present and enabled
    const playButtonNode = queryByLabelText(/play/i);
    expect(playButtonNode).not.toBeNull();
    expect(playButtonNode).not.toBeDisabled();
    // Was the React Player called correctly and told not to play the video?
    expect(ReactPlayer).toHaveBeenLastCalledWith(
      expect.objectContaining({ playing: false, url: "validURL", ...defaultReactPlayerProps }),
      context
    );

    // User Clicks the Play Button
    fireEvent.click(playButtonNode);

    // Was the Thumbnail hidden?
    expect(CSSTransition).toHaveBeenLastCalledWith(
      expect.objectContaining({ in: false, ...defaultCSSTransitionProps }),
      context
    );
    // In which case the Play Button should now be disabled
    expect(queryByLabelText(/play/i)).toBeDisabled();
    // Was the React Player told to play the video?
    expect(ReactPlayer).toHaveBeenLastCalledWith(
      expect.objectContaining({ playing: true, url: "validURL", ...defaultReactPlayerProps }),
      context
    );
  });

  test("displays error if the video request fails", async () => {
    const { container, getByLabelText, queryByLabelText, findByLabelText } = render(
      <VideoArticle title="Test" duration="1:30" image={{}} videoURL="invalidURL" />
    );

    // User Clicks the Play Button
    fireEvent.click(getByLabelText(/play/i));

    // Is there an Error button present which is disabled?
    const errorButtonNode = await findByLabelText(/error/i);
    expect(errorButtonNode).not.toBeNull();
    expect(errorButtonNode).toBeDisabled();
    // Was the Thumbnail told to remain as there is an error?
    expect(CSSTransition).toHaveBeenLastCalledWith(
      expect.objectContaining({ in: true, ...defaultCSSTransitionProps }),
      context
    );
  });
});
