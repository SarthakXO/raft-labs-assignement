import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
  const authToken = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

  const link = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`, 
    headers: {
      apiKey: apiKey, 
      Authorization: `Bearer ${authToken}`, 
    },
    credentials: 'same-origin', 
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;