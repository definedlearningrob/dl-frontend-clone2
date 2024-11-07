import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';

export default {
  component: SharedEmptyContainerPlaceholder,
  title: 'Empty Container Placeholder',
  parameters: {
    componentSubtitle: 'shared empty container placeholder',
  },
};

export const Default = () => <SharedEmptyContainerPlaceholder message='There are no items.' />;
