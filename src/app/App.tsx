import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { Layout } from "antd";
import RepositoryList from "../pages/RepositoryList";
import AppHeader from "./components/AppHeader";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout className="layout">
          <AppHeader />
          <Layout.Content
            style={{
              padding: "50px 16px",
              maxWidth: "960px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* Router would live here in case of multiple screens */}
            <RepositoryList />
          </Layout.Content>
        </Layout>
      </div>
    </ApolloProvider>
  );
}

export default App;
