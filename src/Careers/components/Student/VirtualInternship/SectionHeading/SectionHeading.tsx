import cx from 'classnames';

import styles from './SectionHeading.module.sass';

type Props = {
  heading: string;
  description: string;
  count?: number;
  className?: string;
  variant?: 'sm';
};

export const SectionHeading = ({ heading, description, count, className, variant }: Props) => {
  const variantClass = variant && styles[`variant-${variant}`];

  const headingClassName = cx(styles.heading, variantClass);
  const counterClassName = cx(styles.counter, variantClass);
  const descriptionClassName = cx(styles.description, variantClass);

  return (
    <div className={className}>
      <h5 className={styles.headingWrapper}>
        <span className={headingClassName}>{heading}</span>
        {count !== undefined && <span className={counterClassName}>({count})</span>}
      </h5>
      <p className={descriptionClassName}>{description}</p>
    </div>
  );
};
