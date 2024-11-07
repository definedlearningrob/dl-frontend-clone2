import 'recharts/types/chart/generateCategoricalChart';

declare module 'recharts/types/chart/generateCategoricalChart' {
  export interface CategoricalChartProps {
    overflow?: string;
  }
}

declare module 'recharts' {
  export interface TickProps {
    className?: string;
    fill?: string;
    height: number;
    width: number;
    index: number;
    orientation: 'top' | 'bottom' | 'left' | 'right';
    payload: {
      offset: number;
      value: string;
      coordinate: number;
      index: number;
    };
    stroke: string;
    textAnchor: 'start' | 'middle' | 'end';
    verticalAnchor: 'start' | 'middle' | 'end';
    visibleTicksCount: number;
    x: number;
    y: number;
  }
}
