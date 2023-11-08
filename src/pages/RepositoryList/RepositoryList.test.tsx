import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  GET_REPOSITORIES,
  PageInfo,
  RepositoryNode,
} from "../../graphql/repositoryQueries";
import RepositoryList from "./RepositoryList";

// Mock matchMedia for antd
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

interface CreateMockParams {
  data?: Array<RepositoryNode & { __typename: string }>;
  error?: Error;
  pageInfo?: Partial<PageInfo>;
}

const createMock = ({ data, error, pageInfo }: CreateMockParams) => {
  return {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        query: "topic:react sort:updated-desc",
        first: 10,
        after: null,
        before: null,
      },
    },
    ...(error
      ? { error }
      : {
          result: {
            data: {
              search: {
                nodes: data || [],
                pageInfo: {
                  startCursor: "",
                  endCursor: "",
                  hasNextPage: false,
                  hasPreviousPage: false,
                  ...pageInfo,
                },
              },
            },
          },
        }),
  };
};

afterEach(cleanup);

describe("RepositoryList", () => {
  describe("repositories data", () => {
    describe("when there is an error on GitHub API", () => {
      it("renders the error message", async () => {
        const mocks = [
          createMock({
            error: new Error("Something went wrong"),
          }),
        ];

        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <RepositoryList />
          </MockedProvider>
        );

        expect(
          await screen.findByText(/Error loading repositories/i)
        ).toBeInTheDocument();
      });
    });

    describe("when the GitHub API returns data", () => {
      it("renders the list of repositories", async () => {
        const mocks = [
          createMock({
            data: [
              {
                __typename: "Repository",
                id: "test-id-1",
                name: "Test Repository",
                stargazerCount: 1,
                forkCount: 1,
                url: "https://github.com",
              },
            ],
          }),
        ];

        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <RepositoryList />
          </MockedProvider>
        );

        expect(await screen.findByText(/Test Repository/i)).toBeInTheDocument();
      });
    });
  });

  describe("pagination", () => {
    describe("when there is no next page", () => {
      it("disables the next page button", async () => {
        const mocks = [
          createMock({
            pageInfo: {
              hasNextPage: false,
            },
          }),
        ];

        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <RepositoryList />
          </MockedProvider>
        );

        expect((await screen.findByText(/Next/i)).parentElement).toBeDisabled();
      });
    });

    describe("when there is a next page", () => {
      it("enables the next page button", async () => {
        const mocks = [
          createMock({
            pageInfo: {
              hasNextPage: true,
            },
          }),
        ];

        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <RepositoryList />
          </MockedProvider>
        );

        expect((await screen.findByText(/Next/i)).parentElement).toBeEnabled();
      });
    });

    describe("when there is no previous page", () => {
      it("disables the previous page button", async () => {
        const mocks = [
          createMock({
            pageInfo: {
              hasPreviousPage: false,
            },
          }),
        ];

        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <RepositoryList />
          </MockedProvider>
        );

        expect(
          (await screen.findByText(/Previous/i)).parentElement
        ).toBeDisabled();
      });
    });

    describe("when there is a previous page", () => {
      it("enables the previous page button", async () => {
        const mocks = [
          createMock({
            pageInfo: {
              hasPreviousPage: true,
            },
          }),
        ];

        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <RepositoryList />
          </MockedProvider>
        );

        expect(
          (await screen.findByText(/Previous/i)).parentElement
        ).toBeEnabled();
      });
    });
  });
});
