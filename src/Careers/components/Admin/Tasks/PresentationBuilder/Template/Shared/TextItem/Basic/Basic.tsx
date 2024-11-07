import cx from 'classnames';

import styles from './Basic.module.sass';

type Props = {
  item: { value: string; contentId: string; style: string };
  space?: 'full' | 'half' | 'quarter' | 'sixth';
  className?: string;
};

function AdminTasksPresentationBuilderTemplateSharedTextItemBasic({ item, className }: Props) {
  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.value }}
      className={cx(styles.textContainer, className, 'presentation-textcontainer')}
    />
  );
}

export default AdminTasksPresentationBuilderTemplateSharedTextItemBasic;
