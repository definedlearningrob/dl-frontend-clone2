import SharedBackwardButton from '@shared/components/BackwardButton/BackwardButton';

export default {
  component: SharedBackwardButton,
  title: 'Backward Button',
  parameters: {
    componentSubtitle: 'shared backward link button component',
  },
};

export const Default = () => <SharedBackwardButton link='/' />;
