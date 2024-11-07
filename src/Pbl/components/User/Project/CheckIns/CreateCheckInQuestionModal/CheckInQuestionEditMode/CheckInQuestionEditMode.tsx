import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import CheckInQuestionForm from '@pbl/components/User/Project/CheckIns/CreateCheckInQuestionModal/CheckInQuestionEditMode/CheckInQuestionForm/CheckInQuestionForm';
import useCustomizeCheckInQuestion from '@pbl/hooks/useCustomizeCheckInQuestion';
import { TCheckInQuestion, TValues } from '@pbl/components/Project/types';

type Props = {
  checkInQuestion: TCheckInQuestion;
  handleUpdateQuestion: (
    actions: { setErrors?: Function },
    callback: void,
    checkInQuestion: TCheckInQuestion,
    { question }: TValues
  ) => void;
};

const CheckInQuestionEditMode = ({ checkInQuestion, handleUpdateQuestion }: Props) => {
  const { t } = useTranslation();
  const { toggleEditCheckInQuestionMode } = useCustomizeCheckInQuestion();
  const { question } = checkInQuestion;

  const validationSchema = Yup.object().shape({
    question: Yup.string().trim().required(t('validation.messages.required')),
  });

  const handleFormSubmit = (
    values: TValues,
    checkInQuestion: TCheckInQuestion,
    actions: { setErrors?: Function }
  ) => {
    const { question: passedQuestion } = values;

    if (question === passedQuestion) return;

    handleUpdateQuestion(actions, toggleEditCheckInQuestionMode(), checkInQuestion, values);
  };

  return (
    <Formik
      initialValues={{ question }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => handleFormSubmit(values, checkInQuestion, actions)}>
      <CheckInQuestionForm setEditCheckInQuestionMode={toggleEditCheckInQuestionMode} />
    </Formik>
  );
};

export default CheckInQuestionEditMode;
