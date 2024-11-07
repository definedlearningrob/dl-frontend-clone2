import SharedProgressBar from '@shared/components/ProgressBar/ProgressBar';
import '@shared/i18n';

export default {
  component: SharedProgressBar,
  title: 'Progress Bar',
  parameters: {
    componentSubtitle: 'shared progress bar component',
  },
};

export const Default = () => <SharedProgressBar progress={50} />;
