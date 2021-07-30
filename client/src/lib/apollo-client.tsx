import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError, ErrorHandler } from '@apollo/client/link/error';

import Message from '../components/Message';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
const isBrowser: boolean = (process.env as any).browser;

// Polyfill fetch() on the server (used by apollo-client)
// if (!isBrowser) {
//   (global as any).fetch = fetch;
// }

// interface Options {
//   getToken: () => string;
// }

function create(initialState: any) {
  const token =
    JSON.parse(localStorage.getItem('userData')!) &&
    JSON.parse(localStorage.getItem('userData')!).token;

  const BACKEND_URI =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PUBLIC_BACKEND_URI
      : process.env.REACT_APP_PUBLIC_BACKEND_URI_DEV;

  console.log('backend_uri', BACKEND_URI);

  const httpLink = createHttpLink({
    uri: BACKEND_URI,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const { message, locations, path } of graphQLErrors) {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        alert(message);
      }
    }
    if (networkError) {
      if (isBrowser && networkError.message === 'failed to fetch') {
        alert('Please check your internet connection or retry agan!');
      } else if (
        typeof window !== undefined &&
        networkError.message ===
          'Response not successful: Received status code 400'
      ) {
        alert('Server received bad request. Please check your client queries');
      }
      console.log(`[Network error]: ${networkError}`);
    }
  });

  //   const authLink = setContext((_, { headers }: any) => {
  //     const token = getToken();
  //     return {
  //       headers: {
  //         ...headers,
  //         cookie: token ? `qid=${token}` : '',
  //       },
  //     };
  //   });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
