import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  // Replace with actual logic to fetch your API key and token
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Replace with your API key
  const authToken = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY; // Replace with your Authorization token

  const link = new HttpLink({
    uri: 'https://mwuhrawmjsuvlybbirbt.supabase.co/graphql/v1', // Replace with your GraphQL endpoint
    headers: {
      apiKey: apiKey, // Add your API key here
      Authorization: `Bearer ${authToken}`, // Add your Authorization token here
    },
    credentials: 'same-origin', // Adjust based on your needs
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;