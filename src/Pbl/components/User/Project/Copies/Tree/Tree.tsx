import cx from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as CarrotDownIcon } from '@pbl/svg/carrot_down.svg';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ArrowForwardIcon } from '@shared/svg/arrow_forward.svg';

import styles from './Tree.module.sass';

type TCopies = TCopy[];

interface TCopy {
  id: string;
  copies?: this[];
  displayName: string;
}

const renderArrow = (copy: TCopy) =>
  copy.copies &&
  copy.copies.length > 0 && (
    <SharedIcon className={styles.icon} icon={<CarrotDownIcon />} size='xxs' />
  );

const createUserProjectCopiesTree = (copies: TCopies, indent?: number) => {
  const nextIndent = indent ? indent + 1 : 1;

  const indentDisplayNameClass = (copy: TCopy) =>
    cx(copy.copies && copy.copies.length > 0 && styles.displayNameWithMargin);

  return copies.map((copy) => (
    <li key={copy.id} style={{ position: 'relative' }}>
      <Link className={cx(styles.link)} to={`/projects/${copy.id}`}>
        <div className={styles.linkContent}>
          {renderArrow(copy)}
          <span className={indentDisplayNameClass(copy)}>{copy.displayName}</span>
        </div>
        <SharedIcon
          className={styles.enterIcon}
          icon={<ArrowForwardIcon className={styles.enterIcon} />}
          size='sm'
        />
        <div aria-hidden={true} className={styles.highlight} />
      </Link>
      {copy.copies && copy.copies.length > 0 && (
        <ul className={styles.nestedList}>
          {createUserProjectCopiesTree(copy.copies, nextIndent)}
        </ul>
      )}
    </li>
  ));
};

export default createUserProjectCopiesTree;
