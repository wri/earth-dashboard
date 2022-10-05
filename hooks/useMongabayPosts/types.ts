export type MongabayTopic = {
  __typename: "Topic";
  name: string;
};

export type MongabayPost = {
  __typename: "Post";
  date: string;
  featuredImage: {
    __typename: "NodeWithFeaturedImageToMediaItemConnectionEdge";
    node: {
      __typename: "MediaItem";
      mediaItemUrl: string;
    };
  };
  id: string;
  title: string;
  topics: {
    __typename: "PostToTopicConnection";
    nodes: MongabayTopic[];
  };
  uri: string;
};

export type FormattedMongabayPost = {
  key: string;
  title: string;
  author: string;
  date: Date;
  image: string;
  link: string;
};
