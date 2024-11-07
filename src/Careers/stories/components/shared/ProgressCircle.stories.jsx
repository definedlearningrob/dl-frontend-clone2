import SharedProgressCircle from '@dc/shared/ProgressCircle/ProgressCircle';

export default {
  component: SharedProgressCircle,
  title: 'Progress Circle',
  parameters: {
    componentSubtitle: 'shared progress circle component',
  },
};

export const Small = () => (
  <div
    style={{
      'background-color': 'gray',
    }}>
    <SharedProgressCircle target={10} value={7} />
  </div>
);
