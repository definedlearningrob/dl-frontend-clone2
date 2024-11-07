import React from 'react';

import Tag from '@shared/components/Tag';

import styles from './TagList.module.sass';

type Props = {
  tags: string[][];
  variant: 'default' | 'primary' | 'secondary' | 'light' | 'neutral';
};

export const TagList = (props: Props) => {
  const { tags, variant } = props;

  return (
    <div className={styles.tagsWrapper}>
      {tags.map(([tagLabel, tagValue]) => (
        <Tag key={tagLabel} className={styles.tag} variant={variant}>
          {tagLabel}: {tagValue}
        </Tag>
      ))}
    </div>
  );
};
