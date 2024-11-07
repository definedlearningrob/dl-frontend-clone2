import { castArray, isEmpty } from 'lodash-es';
import cx from 'classnames';

import type { TListWithTitle } from '@pbl/graphql/fragments/course';

import styles from './CourseDetailsCardContent.module.sass';

export type Props = {
  data: TListWithTitle | TListWithTitle[];
  introduction?: string;
};

const ListWithTitleContent = ({ data, introduction }: Props) => (
  <>
    {introduction && <p>{introduction}</p>}
    {castArray(data).map(({ title, elements }) => (
      <div key={title} className={styles.listWithTitle}>
        {title && (
          <p className={styles.paragraph} id={title}>
            {title}
          </p>
        )}
        {!isEmpty(elements) && (
          <ul aria-labelledby={title} className={cx(styles.list, styles.secondaryList)}>
            {elements!.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </>
);

export default ListWithTitleContent;
