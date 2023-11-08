import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $query: String!
    $first: Int!
    $after: String
    $before: String
  ) {
    search(
      query: $query
      type: REPOSITORY
      first: $first
      after: $after
      before: $before
    ) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          stargazerCount
          forkCount
          url
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface RepositoryNode {
  id: string;
  name: string;
  stargazerCount: number;
  forkCount: number;
  url: string;
}

export interface GET_REPOSITORIES_RESPONSE {
  search: {
    repositoryCount: number;
    nodes: RepositoryNode[];
    pageInfo: PageInfo;
  };
}
