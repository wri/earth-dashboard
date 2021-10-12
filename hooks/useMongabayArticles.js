import { useState, useEffect } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GetPostsQuery, formatArticles } from "utils/news";
import TOPICS from "constants/news";

const LIMIT = 10;

const useMongabayArticles = (topic, limit = LIMIT) => {
  const [ newsArticles, setNewsArticles ] = useState([]);

  const { loading, data, networkStatus, refetch, fetchMore, ...rest } = useQuery(
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

  // When the data object changes, format the articles and
  // save them into the state
  useEffect(() => {
    if (!loading) {
      setNewsArticles(formatArticles(data.posts.nodes));
    }
  }, [loading, data]);

  return {
    loading: networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch,
    fetchingMore: networkStatus === NetworkStatus.fetchMore,
    newsArticles,
    fetchMore: () => fetchMore({
      variables: {
        first: limit,
        after: data.posts.pageInfo.endCursor
      }
    })
  }
};

export default useMongabayArticles;
