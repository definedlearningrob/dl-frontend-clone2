import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import styles from './TableBodyLoader.module.sass';

const TableBodyLoader = () => (
  <tbody className={styles.body}>
    <tr>
      <td>
        <SharedLoadingSpinner size='small' />
      </td>
    </tr>
  </tbody>
);

export default TableBodyLoader;
