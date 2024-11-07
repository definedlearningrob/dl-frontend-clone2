import { Formik } from 'formik';
import { isNull } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import { CheckInQuestionSettingsForm } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/CheckInQuestion/CheckInQuestionSettingsForm';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';

import { handleError } from '@shared/utils/handleError';

type Props = {
  contentStyle: string;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  texts: TTaskPresentationText[];
  getText: (id: string, texts: TTaskPresentationText[]) => TTaskPresentationText | undefined;
};

type FormValues = {
  checkInItems: {
    itemId: string;
    itemType: CHECK_IN_ITEM_TYPES;
    step?: number;
  }[];
};

export const CheckInQuestionSettings = ({}: Props) => {
  const { currentSlide, updateSlide } = usePresentationBuilder();
  const { t } = useTranslation();

  if (!currentSlide) return null;

  const initialCheckInItems =
    currentSlide.checkInQuestions.map(({ id }) => ({
      itemId: id,
      itemType: CHECK_IN_ITEM_TYPES.CHECK_IN_QUESTION,
    })) || [];

  const initialValues = {
    checkInItems: initialCheckInItems,
  };

  const handleSubmit = async (values: FormValues) => {
    const checkInItems = values.checkInItems.filter((item) => !isNull(item));

    try {
      await updateSlide({
        variables: {
          input: { id: currentSlide.id, checkInItems: checkInItems },
        },
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div key={currentSlide.id} className='animate-fadeDropIn max-w-[300px] xxxl:max-w-max'>
      <h6>{t('presentation.checkInQuestions')}</h6>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleSubmit}>
        <CheckInQuestionSettingsForm />
      </Formik>
    </div>
  );
};
