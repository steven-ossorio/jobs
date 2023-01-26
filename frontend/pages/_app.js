import NavBar from "@/components/Navbar.component";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/index";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <NavBar />
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
