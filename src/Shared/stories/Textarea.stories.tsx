import SharedTextarea from '@shared/components/Textarea/Textarea';

export default {
  component: SharedTextarea,
  title: 'Textarea',
  parameters: {
    componentSubtitle: 'shared textarea with label',
  },
};

export const Default = () => <SharedTextarea label='Notes' placeholder='' />;

export const WithPlaceholder = () => <SharedTextarea label='Notes' placeholder='Type here...' />;

export const WithErrorMessage = () => (
  <SharedTextarea errorMessage='Error message' label='Notes' placeholder='Type here...' />
);
