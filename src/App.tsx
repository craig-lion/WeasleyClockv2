import "./App.css";
import MainPage from "./MainPage"
import { ApolloProvider, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities";

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

// Attempt to make WebSocket
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: authLink,
    }
  }
});

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
},
  wsLink,
  httpLink,
);

// const client = new ApolloClient({
//   uri: "http://localhost:3000/graphql",
//   link: authLink.concat(splitLink),
//   cache: new InMemoryCache(),
// });
// Attempt to make webSocket


const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// Attempt to create GraphQl client

const clearStore = async (): Promise<void> => {
  await client.clearStore();
  console.log(client.cache)
}

const mainPageProps = {
  clearStore
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <MainPage {...mainPageProps} />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
