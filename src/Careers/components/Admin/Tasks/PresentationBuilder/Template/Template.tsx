import type {
  TTaskPresentationSlide,
  TTaskPresentation,
} from '@dc/graphql/user/queries/taskPresentation';
import { ProductEditor } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/Editor/Editor';
import { AdminProductNav } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/Nav/Nav';
import { ProductPreview } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/Preview/Preview';
import { CheckInQuestionEditor } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestionsEditor';
import { CheckInQuestionsPreview } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestionsPreview';
import { CheckInQuestionsNav } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestionsNav';
import { IFrameFillSlideTemplateEditor } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/IFrameFilledSlide/Editor/Editor';
import { IFrameFillSlideTemplatePreview } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/IFrameFilledSlide/Preview/Preview';
import { IFrameFillSlideTemplateNav } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/IFrameFilledSlide/Nav/Nav';
import { CheckInGroupPreview } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInGroup/CheckInGroupPreview';
import { CheckInGroupNav } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInGroup/CheckInGroupNav';

import BasicTextEditor from './BasicText/Editor/Editor';
import BasicTextNav from './BasicText/Nav/Nav';
import BasicTextPreview from './BasicText/Preview/Preview';
import ImageTextEditor from './ImageText/Editor/Editor';
import ImageTextNav from './ImageText/Nav/Nav';
import ImageTextPreview from './ImageText/Preview/Preview';
import TitleEditor from './Title/Editor/Editor';
import TitleNav from './Title/Nav/Nav';
import TitlePreview from './Title/Preview/Preview';
import VideoEditor from './Video/Editor/Editor';
import VideoNav from './Video/Nav/Nav';
import VideoPreview from './Video/Preview/Preview';
import IFrameEditor from './IFrame/Editor/Editor';
import IFrameNav from './IFrame/Nav/Nav';
import IFramePreview from './IFrame/Preview/Preview';
import TwoProductChoiceEditor from './2ProductChoice/Editor/Editor';
import TwoProductChoiceNav from './2ProductChoice/Nav/Nav';
import TwoProductChoicePreview from './2ProductChoice/Preview/Preview';
import ThreeProductChoiceEditor from './3ProductChoice/Editor/Editor';
import ThreeProductChoiceNav from './3ProductChoice/Nav/Nav';
import ThreeProductChoicePreview from './3ProductChoice/Preview/Preview';
import styles from './Template.module.sass';
import { FourProductEditor, FourProductNav, FourProductPreview } from './4ProductChoice';
import { FiveProductEditor, FiveProductNav, FiveProductPreview } from './5ProductChoice';
import { CheckInGroupEditor } from './CheckInGroup/CheckInGroupEditor';

type NoPresentationSlides = {
  slides: TTaskPresentationSlide[];
};

type Props = {
  slide: TTaskPresentationSlide;
  role: 'editor' | 'nav' | 'preview';
  presentation: TTaskPresentation | NoPresentationSlides;
  handleSelectSlideContent?: (
    object: { id: string; type: string } | null,
    slide: TTaskPresentationSlide
  ) => void;
};

function AdminTasksPresentationBuilderTemplate({
  role,
  slide,
  presentation,
  handleSelectSlideContent,
}: Props) {
  const handleSelectContent = (object: { id: string; type: string } | null) => {
    handleSelectSlideContent && handleSelectSlideContent(object, slide);
  };

  const TemplateComponent = {
    title: { editor: TitleEditor, preview: TitlePreview, nav: TitleNav },
    basicText: { editor: BasicTextEditor, preview: BasicTextPreview, nav: BasicTextNav },
    imageText: { editor: ImageTextEditor, preview: ImageTextPreview, nav: ImageTextNav },
    video: { editor: VideoEditor, preview: VideoPreview, nav: VideoNav },
    iframe: { editor: IFrameEditor, preview: IFramePreview, nav: IFrameNav },
    iframeFilled: {
      editor: IFrameFillSlideTemplateEditor,
      preview: IFrameFillSlideTemplatePreview,
      nav: IFrameFillSlideTemplateNav,
    },
    twoProductChoice: {
      editor: TwoProductChoiceEditor,
      preview: TwoProductChoicePreview,
      nav: TwoProductChoiceNav,
    },
    threeProductChoice: {
      editor: ThreeProductChoiceEditor,
      preview: ThreeProductChoicePreview,
      nav: ThreeProductChoiceNav,
    },
    fourProductChoice: {
      editor: FourProductEditor,
      preview: FourProductPreview,
      nav: FourProductNav,
    },
    fiveProductChoice: {
      editor: FiveProductEditor,
      preview: FiveProductPreview,
      nav: FiveProductNav,
    },
    product: {
      editor: ProductEditor,
      preview: ProductPreview,
      nav: AdminProductNav,
    },
    checkInQuestion: {
      editor: CheckInQuestionEditor,
      preview: CheckInQuestionsPreview,
      nav: CheckInQuestionsNav,
    },
    checkInGroup: {
      editor: CheckInGroupEditor,
      preview: CheckInGroupPreview,
      nav: CheckInGroupNav,
    },
  }[slide.template][role];

  const isPresentationType = (
    slidesObj: TTaskPresentation | NoPresentationSlides
  ): slidesObj is TTaskPresentation =>
    slidesObj && (slidesObj as TTaskPresentation).id !== undefined;

  const className = isPresentationType(presentation) ? styles[presentation.typography] : '';

  return (
    <div className={className}>
      <TemplateComponent
        handleSelectSlideContent={handleSelectContent}
        slide={slide}
        slides={presentation?.slides}
      />
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplate;
