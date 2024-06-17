import { HttpLink, TypedDocumentNode, from } from '@apollo/client';
import { 
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { onError } from "@apollo/client/link/error"
import { GQL_URL } from '@/config';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: GQL_URL,
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
});

export const queryData = async <T>(
  query: TypedDocumentNode<T>,
  variables?: Record<string, unknown>,
) => {
  const client = getClient();
  const { data } = await client.query({
    query,
    variables,
  });

  return data;
};

export const dndGraph = {
  query: queryData,
};