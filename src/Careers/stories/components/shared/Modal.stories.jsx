import SharedModal from '@shared/components/Modal/Modal';

export default {
  component: SharedModal,
  title: 'Modal',
  parameters: {
    componentSubtitle: 'modal with all components',
  },
};

export const Default = () => (
  <SharedModal show={true}>
    <SharedModal.Header>
      <SharedModal.Heading>I am modal Heading (title)</SharedModal.Heading>
    </SharedModal.Header>
    <SharedModal.Body>I am modal body</SharedModal.Body>
    <SharedModal.Footer>I am modal footer</SharedModal.Footer>
  </SharedModal>
);
