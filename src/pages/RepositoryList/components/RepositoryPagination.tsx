import { Button, Flex } from "antd";
import { PageInfo } from "../../../graphql/repositoryQueries";

interface RepositoryPaginationProps {
  pageInfo: PageInfo;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function RepositoryPagination({
  pageInfo,
  onPrevPage,
  onNextPage,
}: RepositoryPaginationProps) {
  return (
    <Flex gap={10} justify="flex-end">
      <Button disabled={!pageInfo.hasPreviousPage} onClick={onPrevPage}>
        Previous
      </Button>
      <Button disabled={!pageInfo.hasNextPage} onClick={onNextPage}>
        Next
      </Button>
    </Flex>
  );
}
