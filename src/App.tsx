import "./App.css";
import MainPage from "./MainPage"
import { ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Attempt to create GraphQl client
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // console.log('this is token in App.tsx authLink: ', token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// Attempt to create GraphQl client

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <MainPage />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
