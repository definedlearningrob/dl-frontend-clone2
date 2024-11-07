import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type {
  TTaskPresentation,
  TTaskPresentationSlideTemplate,
  TTaskPresentationText,
} from '@dc/graphql/user/queries/taskPresentation';
import { ProductSettings } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/Product/ProductSettings';
import { CheckInQuestionSettings } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/CheckInQuestion/CheckInQuestionSettings';
import { IFrameFilledSettings } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/IframeFilled/IframeFilledSettings';
import { CheckInGroupSettings } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/CheckInGroup/CheckInGroupSettings';

import EditOverlay from '../EditOverlay/EditOverlay';

import BasicText from './BasicText/BasicText';
import Iframe from './Iframe/Iframe';
import ImageText from './ImageText/ImageText';
import Title from './Title/Title';
import { FourProductChoice } from './4ProductChoice/4ProductChoice';
import ThreeProductChoice from './3ProductChoice/3ProductChoice';
import TwoProductChoice from './2ProductChoice/2ProductChoice';
import Video from './Video/Video';
import { FiveProductChoice } from './5ProductChoice/5ProductChoice';

type Props = {
  editionDisabled: boolean;
};

function AdminTasksPresentationBuilderSettingsElementsSettings({ editionDisabled }: Props) {
  const { t } = useTranslation();
  const { cache } = useApolloClient();
  const { currentSlide, selectedSlideContent, currentPresentation, taskId } =
    usePresentationBuilder();

  const shouldShowElement = (element: { id: string; type: string }) => {
    const elementTypeIsSelected =
      selectedSlideContent?.type === element.type && selectedSlideContent?.id === element.id;

    return elementTypeIsSelected || !selectedSlideContent;
  };

  const handleEditorChange = (values: string, editedContentId: string) => {
    if (!currentPresentation) return;

    const oldTextValue = currentSlide?.content.texts.find(
      (item: TTaskPresentationText) => item.contentId === editedContentId
    )?.value;
    const valueChanged = oldTextValue !== values;

    if (valueChanged) {
      const newSlideContentTexts = currentSlide?.content.texts.map((item: TTaskPresentationText) =>
        item.contentId === editedContentId ? { ...item, value: values } : item
      );
      if (currentSlide) {
        cache.modify({
          id: cache.identify(currentSlide.content),
          fields: {
            texts(existing) {
              return newSlideContentTexts ?? existing;
            },
          },
        });
      }
    }
  };

  if (!currentSlide) {
    const placeholder = taskId
      ? t('admin.tasks.presentation.noSlideInCurrentPresentation')
      : t('admin.tasks.presentation.noSlideInSlideLibrary');

    return <p>{placeholder}</p>;
  }
  const getText = (id: string, texts: TTaskPresentationText[]) =>
    texts.find((item: TTaskPresentationText) => item.contentId === id);

  const fontFamily = {
    montserrat: 'Montserrat',
    lora: 'Lora',
    cabinSketch: 'Cabin Sketch',
    roboto: 'Roboto Mono',
  }[(currentPresentation as TTaskPresentation).typography];

  const editorContentStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Lora:wght@400;700&family=Montserrat:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap');
roboto: 'Roboto Mono',
    body { font-size: 21pt; background-color: #FCFCFC; }
    body * { margin: 0; font-family: ${fontFamily};  }
    p, span { font-family: ${fontFamily === 'Roboto Mono' ? 'Roboto Mono' : 'Montserrat'};}
    span { display: inline; };
  `;

  const ElementsComponent = {
    basicText: BasicText,
    title: Title,
    imageText: ImageText,
    iframe: Iframe,
    iframeFilled: IFrameFilledSettings,
    video: Video,
    twoProductChoice: TwoProductChoice,
    threeProductChoice: ThreeProductChoice,
    fourProductChoice: FourProductChoice,
    fiveProductChoice: FiveProductChoice,
    product: ProductSettings,
    checkInQuestion: CheckInQuestionSettings,
    checkInGroup: CheckInGroupSettings,
  }[currentSlide.template as TTaskPresentationSlideTemplate];

  if (editionDisabled) {
    return <EditOverlay />;
  }

  return (
    <ElementsComponent
      contentStyle={editorContentStyle}
      getText={getText}
      handleEditorChange={handleEditorChange}
      shouldShowElement={shouldShowElement}
      texts={currentSlide.content.texts}
    />
  );
}

export default AdminTasksPresentationBuilderSettingsElementsSettings;
