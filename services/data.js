import axios from 'axios';

// utils
import { logger } from 'utils/logs';

export const fetchTopicData = () =>
  new Promise((resolve, reject) => {
    logger.info('Fetch RW config');

    axios.get('https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/data/TopicPagesData.json')
      .then(response => resolve(response.data))
      .catch(error => reject(new Error('There was an error loading the Topics data', error)));
  });

export default { fetchTopicData };
