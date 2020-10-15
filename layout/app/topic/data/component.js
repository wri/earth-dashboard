import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';

// components
import Layout from 'layout/layout/layout-app';

// utils
import {
  getColorByTopic,
  CLIMATE,
  OCEANS,
  FORESTS,
  FRESHWATER
} from 'utils/topics';

// styles
import styles from './topic-data.module.scss';
import { useRouter } from 'next/router';

function LayoutTopicData(props) {
  const { topic } = props;
  const router = useRouter();

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth Dashboard"
      className={styles.topic}
    >
      Topic data!!
    </Layout>
  );
}

export default LayoutTopicData;
