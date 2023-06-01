import { ApolloClient , InMemoryCache } from "@apollo/client";

export const getClient = () => {
    const api = process.env.NEXT_PUBLIC_API_URL || ''
    const client = new ApolloClient({
        uri: api,
        cache: new InMemoryCache(),
        headers: {
            Authorization: `apiKey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
        }
    });
    return client;
}