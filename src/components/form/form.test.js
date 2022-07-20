import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

import Form from "./index";

const server = setupServer(
  rest.get("/greeting", (req, res, ctx) => {
    return res(ctx.json({ greeting: "hello there" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Tests for the form to be submit", () => {
  it("Should submit the form", async () => {
    const handleCount = jest.fn();
    const updateRequestParams = jest.fn();
    render(
      <Form
        handleCount={handleCount}
        updateRequestParams={updateRequestParams}
      />
    );
    const input = await screen.findByTestId("test-input");
    const button = await screen.findByTestId("test-button");

    fireEvent.change(input, {
      target: { value: "Some text" },
    });
    fireEvent.click(button);

    expect(handleCount).toBeCalled();
  });

  test("loads and displays greeting", async () => {
    const handleCount = jest.fn();
    const updateRequestParams = jest.fn();

    render(
      <Form
        handleCount={handleCount}
        updateRequestParams={updateRequestParams}
      />
    );

    const input = await screen.findByTestId("test-input");
    const button = await screen.findByTestId("test-button");

    fireEvent.click(button);

    await waitFor(() => screen.findByTestId("test-results"));

    expect(screen.findByTestId("test-results")).toHaveTextContent(
      "hello there"
    );
  });
});
