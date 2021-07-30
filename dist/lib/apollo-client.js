import * as __SNOWPACK_ENV__ from '../env.js';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "../pkg/@apollo/client.js";
import {onError} from "../pkg/@apollo/client/link/error.js";
let apolloClient = null;
const isBrowser = __SNOWPACK_ENV__.browser;
function create(initialState) {
  const token = JSON.parse(localStorage.getItem("userData")) && JSON.parse(localStorage.getItem("userData")).token;
  const httpLink = createHttpLink({
    uri: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_BACKEND_URI,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      for (const {message, locations, path} of graphQLErrors) {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        alert(message);
      }
    }
    if (networkError) {
      if (isBrowser && networkError.message === "failed to fetch") {
        alert("Please check your internet connection or retry agan!");
      } else if (typeof window !== void 0 && networkError.message === "Response not successful: Received status code 400") {
        alert("Server received bad request. Please check your client queries");
      }
      console.log(`[Network error]: ${networkError}`);
    }
  });
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}
export default function initApollo(initialState) {
  if (!isBrowser) {
    return create(initialState);
  }
  if (!apolloClient) {
    apolloClient = create(initialState);
  }
  return apolloClient;
}
