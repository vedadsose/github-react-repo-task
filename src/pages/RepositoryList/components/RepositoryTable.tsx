import { AlignType } from "rc-table/lib/interface";
import { RepositoryNode } from "../../../graphql/repositoryQueries";
import { useMemo } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { Table } from "antd";

interface RepositoryTableProps {
  loading: boolean;
  repositories: RepositoryNode[];
}

export default function RepositoryTable({
  loading,
  repositories,
}: RepositoryTableProps) {
  const dataSource = repositories.map((node) => ({
    ...node,
    key: node.id,
  }));

  const columns = useMemo(
    () => [
      {
        title: "Repository Name",
        key: "name",
        render: (text: string, record: RepositoryNode) => {
          return (
            <a href={record.url} target="_blank" rel="noreferrer">
              {record.name} <LinkOutlined />
            </a>
          );
        },
      },
      {
        title: "⭐️ Stargazers",
        dataIndex: "stargazerCount",
        align: "right" as AlignType,
        key: "stargazerCount",
      },
      {
        title: "🍴 Forks",
        dataIndex: "forkCount",
        align: "right" as AlignType,
        key: "forkCount",
      },
    ],
    []
  );

  return (
    <Table
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
}
