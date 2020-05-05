import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { render, waitForElementToBeRemoved } from "@testing-library/react";

import { API } from "./constants";

import App from "./App";

it("renders without crashing", () => {
  const { baseElement } = render(<App />);

  expect(baseElement).toBeTruthy();
});

it("axios mock success", async () => {
  const mock = new MockAdapter(axios);

  const objResponse = {
    data: {
      david: "test",
    },
  };

  mock.onGet(API).reply(200, objResponse);

  const { container, getByText } = render(<App />);

  await waitForElementToBeRemoved(getByText("loading..."));

  const selector = container.querySelector("pre");

  expect(selector.textContent).toBe(JSON.stringify(objResponse, null, 2));
});

it("axios mock failure", async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(API).reply(500);

  const { debug, container, getByText } = render(<App />);

  await waitForElementToBeRemoved(() => getByText("loading..."));

  debug();
  const selector = container.querySelector("div");

  expect(selector.textContent).toBe("error...");
});
