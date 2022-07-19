import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import Form from "./index";

describe("Tests for the form to be submit", () => {
  it("Should submit the form", async () => {
    const handleCount = jest.fn();
    const handleApiCall = jest.fn();
    render(<Form handleCount={handleCount} handleApiCall={handleApiCall} />);
    const input = await screen.findByTestId("test-input");
    const button = await screen.findByTestId("test-button");

    fireEvent.change(input, {
      target: { value: "Some text" },
    });
    fireEvent.click(button);

    expect(handleCount).toBeCalled();
  });
});
