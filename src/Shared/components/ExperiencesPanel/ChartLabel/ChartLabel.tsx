import styles from './ChartLabel.module.sass';

type Props = {
  chartValue?: number;
  label: string;
  viewBox?: {
    cx: number;
    cy: number;
  };
};

export const ChartLabel = ({ viewBox, chartValue, label }: Props) => {
  const { cx, cy } = viewBox!;

  return (
    <g>
      <text dominantBaseline='middle' textAnchor='middle' x={cx} y={cy}>
        <tspan className={styles.title}>{chartValue}</tspan>
        <tspan className={styles.subtitle} dx='0' dy='2.5em' x={cx}>
          {label}
        </tspan>
      </text>
    </g>
  );
};
