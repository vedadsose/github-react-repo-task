import { Layout, Typography } from "antd";
import { styled } from "styled-components";

const Title = styled(Typography.Title)`
  &.ant-typography {
    margin: 0;
    color: #fff;
    font-size: 2rem;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const Header = styled(Layout.Header)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AppHeader() {
  return (
    <Header>
      <Title>React GitHub Repositories</Title>
    </Header>
  );
}
