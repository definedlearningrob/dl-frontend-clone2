import styles from './DataBadge.module.sass';

type Props = {
  badgeValue: number | string;
  text?: string;
};

const DataBadge = ({ badgeValue, text }: Props) => (
  <div className={styles.badgeWrapper}>
    {text && <p className={styles.badgeText}>{text}</p>}
    <span className={styles.badge}>{badgeValue}</span>
  </div>
);

export default DataBadge;
