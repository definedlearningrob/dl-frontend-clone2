import SharedFileExtensionIcon from '@dc/shared/FileExtensionIcon/FileExtensionIcon';

export default {
  component: SharedFileExtensionIcon,
  title: 'SharedFileExtensionIcon',
  parameters: {
    componentSubtitle: 'shared file extension icon',
  },
};

export const Default = () => <SharedFileExtensionIcon filename='filename.unknown' />;
export const Image = () => <SharedFileExtensionIcon filename='filename.jpg' />;
export const Video = () => <SharedFileExtensionIcon filename='filename.mp4' />;
export const Document = () => <SharedFileExtensionIcon filename='filename.doc' />;
export const Sheet = () => <SharedFileExtensionIcon filename='filename.xls' />;
export const Presentation = () => <SharedFileExtensionIcon filename='filename.ppt' />;
