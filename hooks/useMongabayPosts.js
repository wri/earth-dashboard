import { useState, useEffect } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GetPostsQuery, formatPosts } from "utils/news";
import TOPICS from "constants/news";

const LIMIT = 10;

/**
 * Fetches posts from the mongabay graphql endpoint based on predefined topics.
 * 
 * @param {String} topic 
 *        Posts returned from the endpoint will be part of this topic
 * @param {Number} [limit]
 *        Override for the max number of posts that can be returned from the
 *        endpoint
 * 
 * @returns {Object} response
 * @property {Boolean} isLoading
 *           True if the initial posts are being fetched from the endpoint,
 *           will be true if refetching posts
 * @property {Boolean} hasErrored
 *           True if an error has occurred during the fetch
 * @property {Array} posts
 *           An array of formated posts from the endpoint
 * @property {Boolean} canFetchMore
 *           True if there are more posts available from the endpoint after the
 *           previous query
 * @property {Boolean} isFetchingMore
 *           True if more posts are being fetched from the endpoint
 * @property {Function} fetchMore
 *           Function to fetch more posts from the endpoint, which will be
 *           concatenated to the current posts
 */
const useMongabayPosts = (topic, limit = LIMIT) => {
  const [ posts, setPosts ] = useState([]);

  const { loading, error, data, networkStatus, refetch, fetchMore } = useQuery(
    GetPostsQuery,
    {
      variables: {
        first: limit,
        after: null,
        topics: TOPICS[topic].join(",")
      },
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all'
    }
  );

  // When the topic or limit changes, refetch the data
  useEffect(() => {
    refetch();
  }, [topic, limit]);

  // When the data object changes, format the posts and
  // save them into the state
  useEffect(() => {
    if (!loading && !error) {
      setPosts(formatPosts(data.posts.nodes));
    }

    if (error) {
      console.error(error);
    }
  }, [loading, error, data]);

  return {
    isLoading: networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch,
    hasErrored: !!error,
    posts,
    canFetchMore: data?.posts.pageInfo.hasNextPage && networkStatus !== NetworkStatus.refetch && !error,
    isFetchingMore: networkStatus === NetworkStatus.fetchMore,
    fetchMore: () => fetchMore({
      variables: {
        first: limit,
        after: data.posts.pageInfo.endCursor
      }
    })
  }
};

export default useMongabayPosts;
