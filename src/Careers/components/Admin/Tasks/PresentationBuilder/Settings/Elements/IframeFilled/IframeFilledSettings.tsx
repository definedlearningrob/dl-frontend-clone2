import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import { IFrameFilledForm } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/IframeFilled/IFrameForm/IFrameForm';

type Props = {
  contentStyle: string;
  getText: (id: string, texts: TTaskPresentationText[]) => TTaskPresentationText | undefined;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  texts: TTaskPresentationText[];
};

export const IFrameFilledSettings = ({ shouldShowElement }: Props) => {
  const { currentSlide, scriptView: scriptViewObject } = usePresentationBuilder();

  const scriptView =
    scriptViewObject && currentSlide?.id ? scriptViewObject[currentSlide.id] : false;
  const shouldShowIframe = shouldShowElement({ type: 'iframe', id: '1' }) && !scriptView;

  return <div className='animate-fadeDropIn'>{shouldShowIframe && <IFrameFilledForm />}</div>;
};
