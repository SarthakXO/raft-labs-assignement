import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Function to create and configure an Apollo Client instance
const createApolloClient = () => {
  
  // Fetch API Key and Auth Token from environment variables
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;  // Supabase API key for client-side usage
  const authToken = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY; // Supabase Service Role key for authorized requests

  // Set up the HTTP Link for Apollo Client with the GraphQL API endpoint and necessary headers
  const link = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,  // URL of the GraphQL API (Supabase GraphQL endpoint)
    headers: {
      apiKey: apiKey,  // Attach API key to the request headers
      Authorization: `Bearer ${authToken}`,  // Authorization header using Service Role token for authentication
    },
    credentials: 'same-origin',  // Ensure cookies are included in cross-origin requests
  });

  // Return a new ApolloClient instance with the created link and in-memory cache
  return new ApolloClient({
    link,  // Set the Apollo Client link to the HttpLink
    cache: new InMemoryCache(),  // Use in-memory cache for storing query results
  });
};

export default createApolloClient;
