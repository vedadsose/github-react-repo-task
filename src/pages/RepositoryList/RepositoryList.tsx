import { useQuery } from "@apollo/client";
import { Alert, Flex, Input } from "antd";
import {
  GET_REPOSITORIES,
  GET_REPOSITORIES_RESPONSE,
} from "../../graphql/repositoryQueries";
import RepositoryTable from "./components/RepositoryTable";
import RepositoryPagination from "./components/RepositoryPagination";
import { useCallback } from "react";

const BASE_QUERY = "topic:react sort:updated-desc";

export default function RepositoryList() {
  // Fetch the repositories from the GitHub API
  const { data, loading, refetch, error } = useQuery<GET_REPOSITORIES_RESPONSE>(
    GET_REPOSITORIES,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        query: BASE_QUERY,
        first: 10,
        after: null,
        before: null,
      },
    }
  );

  const { nodes, pageInfo } = data?.search || { nodes: [], pageInfo: null };

  // Handlers for pagination and search
  const handleNextPage = useCallback(() => {
    refetch({
      before: null,
      after: pageInfo?.endCursor,
    });
  }, [refetch, pageInfo]);

  const handlePrevPage = useCallback(() => {
    refetch({
      before: pageInfo?.startCursor,
      after: null,
    });
  }, [refetch, pageInfo]);

  const handleSearch = useCallback(
    (query: string) => {
      refetch({
        query: !query ? BASE_QUERY : `${BASE_QUERY} ${query} in:name`,
        first: 10,
        after: null,
      });
    },
    [refetch]
  );

  if (error) {
    return (
      <Alert
        message="Error loading repositories"
        description="Make sure you have a stable internet connection and try again."
        type="error"
        showIcon
      />
    );
  }

  return (
    <Flex vertical gap={20}>
      <Input.Search placeholder="Search repositories" onSearch={handleSearch} />
      <RepositoryTable loading={loading} repositories={nodes} />
      {pageInfo && (
        <RepositoryPagination
          pageInfo={pageInfo}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </Flex>
  );
}
