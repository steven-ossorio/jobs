import NavBar from "@/components/Navbar.component";
import { ModelsProvider } from "@/context/models.context";
import { SearchUserProvider } from "@/context/searchUser.context";
import { UserProvider } from "@/context/user.context";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/index";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <UserProvider>
          <ModelsProvider>
            <SearchUserProvider>
              <NavBar />
              <Component {...pageProps} />
            </SearchUserProvider>
          </ModelsProvider>
        </UserProvider>
      </ApolloProvider>
    </>
  );
}
