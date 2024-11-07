import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

export default {
  component: SharedCheckbox,
  title: 'Checkbox',
  parameters: {
    componentSubtitle: 'shared checkbox input',
  },
};

export const Default = () => <SharedCheckbox label='Test label' />;
export const DefaultWithError = () => (
  <SharedCheckbox errorMessage='Error message' label='With error' />
);
