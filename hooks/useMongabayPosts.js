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
 * @property {Boolean} loading
 *           True if the initial posts are being fetched from the endpoint,
 *           will be true if refetching posts
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

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(
    GetPostsQuery,
    {
      variables: {
        first: limit,
        after: null,
        topics: TOPICS[topic].join(",")
      },
      notifyOnNetworkStatusChange: true
    }
  );

  // When the topic or limit changes, refetch the data
  useEffect(() => {
    refetch();
  }, [topic, limit]);

  // When the data object changes, format the posts and
  // save them into the state
  useEffect(() => {
    if (!loading) {
      setPosts(formatPosts(data.posts.nodes));
    }
  }, [loading, data]);

  return {
    loading: networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch,
    posts,
    canFetchMore: data?.posts.pageInfo.hasNextPage && networkStatus !== NetworkStatus.refetch,
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
