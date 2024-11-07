import SharedDropableArea from '@shared/components/DropableArea/DropableArea';
import '@shared/i18n';

export default {
  component: SharedDropableArea,
  title: 'Dropable Area',
  parameters: {
    componentSubtitle: 'shared dropable area component',
  },
};

export const Default = () => <SharedDropableArea value={[]} onDrop={() => {}} />;

export const WithLabel = () => (
  <SharedDropableArea label='Some label' value={[]} onDrop={() => {}} />
);

export const WithPreviewUrl = () => (
  <SharedDropableArea
    previewUrl='https://picsum.photos/id/237/200/300'
    value={[]}
    onDrop={() => {}}
  />
);

export const WithValue = () => (
  <SharedDropableArea
    previewUrl='https://picsum.photos/id/237/200/300'
    value={[new File([''], '')]}
    onDrop={() => {}}
  />
);

export const WithLoading = () => (
  <SharedDropableArea
    assetType='image'
    isLoading={true}
    previewUrl='https://picsum.photos/id/237/200/300'
    value={[new File([''], '')]}
    onDrop={() => {}}
  />
);
