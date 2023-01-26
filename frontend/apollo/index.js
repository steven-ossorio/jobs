import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
