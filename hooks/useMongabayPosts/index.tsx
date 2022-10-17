import { useState, useEffect } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GetPostsQuery, formatPosts } from "utils/news";
import TOPICS from "constants/news";
import { FormattedMongabayPost } from "./types";

type UseMongabayPostsVariables = {
  limit: number;
  topic?: keyof typeof TOPICS;
  search?: string;
};

type UseMongabayPosts = {
  /**
   * True if the initial posts are being fetched from the endpoint.
   * Will be true if refetching posts.
   */
  isLoading: boolean;
  /** True if an error has occurred during the fetch. */
  hasErrored: boolean;
  /** An array of formated posts from the endpoint. */
  posts: FormattedMongabayPost[];
  /** True if there are more posts available from the endpoint after the previous query. */
  canFetchMore: boolean;
  /** True if more posts are being fetched from the endpoint. */
  isFetchingMore: boolean;
  /** Function to fetch more posts from the endpoint, which will be concatenated to the current posts. */
  fetchMore: (loadMoreLimit: number) => void;
};

/** Fetches posts from the mongabay graphql endpoint based on predefined topics. */
const useMongabayPosts = ({ limit, topic, search }: UseMongabayPostsVariables): UseMongabayPosts => {
  const [posts, setPosts] = useState<FormattedMongabayPost[]>([]);

  const { loading, error, data, networkStatus, refetch, fetchMore } = useQuery(GetPostsQuery, {
    variables: {
      first: limit,
      after: null,
      topics: TOPICS[topic as keyof typeof TOPICS] ?? Object.values(TOPICS).flat(),
      search
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all"
  });

  // When the topic or limit changes, refetch the data
  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, [topic, search, limit]);

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
    fetchMore: (loadMoreLimit = limit) =>
      fetchMore({
        variables: {
          first: loadMoreLimit,
          after: data.posts.pageInfo.endCursor
        }
      })
  };
};

export default useMongabayPosts;
