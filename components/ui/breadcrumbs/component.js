import PropTypes from 'prop-types';
import Link from 'next/link';

// components
import Icon from 'components/ui/icon';

// styles
import styles from './breadcrumbs.module.scss';

function Breadcrumbs({ items = [] }) {
  return (
    <ul className={styles['c-breadcrumbs']}>
      {items.map(item => (
        <li key={item.name} className={styles.item}>
          {item.route ? (
            <Link href={
              {
                pathname: item.route,
                query: item.params
              }}
            >
              <a>
                {items.length === 1 && (
                  <Icon className="c-icon -smaller" name="icon-arrow-left-2" />
                )}
                <span>{item.name}</span>
              </a>
            </Link>
          ) : (
            <a href={item.href}>
              {items.length === 1 && <Icon className="c-icon -smaller" name="icon-arrow-left-2" />}
              <span>{item.name}</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

Breadcrumbs.propTypes = { items: PropTypes.array };

export default Breadcrumbs;
