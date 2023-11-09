# GitHub React Repositories List

Simple React app that connects to the GitHub API using their GraphQL API, and lists out repositories that are tagged with "React". Also allows for pagination and search.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

To start you'll need to create your own `.env.local` file and fill it with a GitHub token

```sh
cp .env.local.example .env.local
```

To get the token please follow [these instructions](https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). After that add the token to your new ``.env.local` file you just created.

## Running the app locally

Make sure to install the dependencies first, and then run the app:

```sh
npm i
npm start
```

## Running tests

```sh
npm run test
```
