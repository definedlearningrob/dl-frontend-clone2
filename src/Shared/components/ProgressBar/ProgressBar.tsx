import styles from './ProgressBar.module.sass';

type Props = {
  progress: number;
  target?: number;
};

function SharedProgressBar({ progress, target = 100 }: Props) {
  const getProgressPercentage = () => Number(((100 * progress) / target).toFixed());

  return (
    <div className={styles.container}>
      <div className={styles.range}>
        <div className={styles.indicator} style={{ width: `${getProgressPercentage()}%` }} />
      </div>
    </div>
  );
}

export default SharedProgressBar;
