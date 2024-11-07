import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export default {
  component: SharedLoadingSpinner,
  title: 'Loading Spinner',
  parameters: {
    componentSubtitle: 'shared loading spinner component',
  },
};

const blackBoxStyles = {
  padding: '20px',
  backgroundColor: 'black',
};

export const Default = () => <SharedLoadingSpinner />;

export const ColorWhite = () => (
  <div style={blackBoxStyles}>
    <SharedLoadingSpinner color='white' />
  </div>
);

export const ColorDisabled = () => <SharedLoadingSpinner color='disabled' />;

export const FullScreen = () => <SharedLoadingSpinner size='full-screen' />;

export const Small = () => <SharedLoadingSpinner size='small' />;
