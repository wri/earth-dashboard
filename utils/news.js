import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const APOLLO_CLIENT = new ApolloClient({
  uri: "https://news.mongabay.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = { nodes: [] }, incoming) {
              const concatenatedPosts = [...existing.nodes, ...incoming.nodes];
              return {
                ...incoming,
                nodes: concatenatedPosts
              };
            }
          }
        }
      }
    }
  })
});

export const MONGABAY_NEWS_DOMAIN = "https://news.mongabay.com";
export const NOW_THIS_EARTH_RSS_URL = "https://feeds.groupninemedia.com/feeds/nowthis/earthhq";

/**
 * Formats the posts so that they can render within the news-article component
 * @see components/news-article
 * 
 * @param {Array} posts - The array of posts from the endpoint
 * @returns {Array} The formated posts
 */
export const formatPosts = posts =>
  posts.reduce((accumulator, currentValue) => {
    accumulator.push({
      key: currentValue.id,
      title: currentValue.title,
      author: "Mongabay",
      date: new Date(currentValue.date),
      image: currentValue.featuredImage.node.mediaItemUrl,
      link: MONGABAY_NEWS_DOMAIN + currentValue.uri
    });
    return accumulator;
  }, []);

export const GetPostsQuery = gql`
  query GetPosts($first: Int, $after: String, $topics: String) {
    posts(first: $first, after: $after, where: { tag: $topics }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        tags {
          nodes {
            name
          }
        }
        title
        date
        uri
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

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
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }
}
`;
