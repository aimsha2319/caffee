import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { ReactNode, useMemo } from 'react';

const endpoint = process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:4000/graphql';

export function GraphQLProvider({ children }: { children: ReactNode }) {
  const client = useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: endpoint }),
        cache: new InMemoryCache()
      }),
    []
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
