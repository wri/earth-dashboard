import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const APOLLO_CLIENT = new ApolloClient({
  uri: 'https://news.mongabay.com/graphql',
  cache: new InMemoryCache()
});

export const MONGABAY_NEWS_DOMAIN = 'https://news.mongabay.com';

export const GET_NEWS_BY_TOPIC_QUERY = (topics, limit) => gql`
query {
  posts (first: ${limit}, where: { tag: "${topics}" }) {
    nodes {
      tags {
        nodes {
          name
        }
      }
      title,
      date,
      uri,
      locations {
        edges {
          node {
            name
          }
        }
      },
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }
}
`;
