import React from "react";
import { ApolloProvider } from "@apollo/client";

import { Layout } from "antd";
import RepositoryList from "../pages/RepositoryList";
import AppHeader from "./components/AppHeader";
import apolloClient from "../graphql/client";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
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
