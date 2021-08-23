import PropTypes from 'prop-types';

// components
import TableFilters from '../TableFilters';
import TableSorts from '../TableSorts';

// styles
import styles from './table-header-actions.module.scss';

function TableHeaderActions(props) {
  return (
    <div className={styles['c-table-header-actions']}>
      <ul>
        <li className="action sortby-action">
          <TableSorts {...props} />
        </li>

        {props.filters &&
          <li className="action filter-action">
            <TableFilters {...props} />
          </li>
        }
      </ul>
    </div>
  );
}

TableHeaderActions.propTypes = {
  field: PropTypes.string.isRequired,
  values: PropTypes.array,
  selected: PropTypes.array,
  filters: PropTypes.bool,
  onFilter: PropTypes.func,
  onSort: PropTypes.func
};

// TableHeaderActions.defaultProps = {
//   onChange: null,
//   selected: null,
//   filters: true
// };

export default TableHeaderActions;
