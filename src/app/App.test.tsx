import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

// Mock matchMedia for antd
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

afterEach(cleanup);

describe("App", () => {
  it("renders the app", () => {
    render(<App />);
    const linkElement = screen.getByText(/React GitHub Repositories/i);
    expect(linkElement).toBeInTheDocument();
  });
});
