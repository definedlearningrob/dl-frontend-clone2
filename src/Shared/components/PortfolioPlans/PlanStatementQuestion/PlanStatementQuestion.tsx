import { useToggle } from 'react-use';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';
import { cx } from '@shared/utils/cx';
import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { ShortTextQuestion } from './ShortTextQuestion';
import { LongTextQuestion } from './LongTextQuestion';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { MultipleChoiceDropdownQuestion } from './MultipleChoiceDropdownQuestion';

type FormValues = {
  answer: string[];
};

type Props = {
  questionType: STATEMENT_QUESTION_TYPE;
  answer?: string[];
  options?: { option: string; id: string }[];
  text: string;
  onSubmit: (answer: string[]) => void;
};

const answerComponentsMap = {
  [STATEMENT_QUESTION_TYPE.SHORT_TEXT]: ShortTextQuestion,
  [STATEMENT_QUESTION_TYPE.LONG_TEXT]: LongTextQuestion,
  [STATEMENT_QUESTION_TYPE.SINGLE_CHOICE]: SingleChoiceQuestion,
  [STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE]: MultipleChoiceQuestion,
  [STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE_DROPDOWN]: MultipleChoiceDropdownQuestion,
};

export const PlanStatementQuestion = ({
  questionType,
  answer = [],
  options = [],
  text,
  onSubmit,
}: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [isEditing, toggleIsEditing] = useToggle(isEmpty(answer));

  const AnswerComponent = answerComponentsMap[questionType];

  const handleSave = async (values: FormValues) => {
    await onSubmit(values.answer);
    toggleIsEditing();
  };

  const validationSchema = Yup.object().shape({
    answer: Yup.mixed().when({
      is: Array.isArray,
      then: () => Yup.array().min(1, t('validation.messages.required')),
      otherwise: () => Yup.string().required(t('validation.messages.required')),
    }),
  });

  const buttonSize = isFullHD ? 'md' : 'sm';

  const headingClasses = cx(
    'p-xs pt-x xxxl:p-sm xxxl:pb-x bg-neutral-200 rounded-t-xs',
    'text-xs xxxl:text-sm font-medium leading-lg'
  );

  const isDropdownQuestion = questionType === STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE_DROPDOWN;
  const cardContentClasses = cx('flex py-sm px-x xxxl:px-sm', {
    'items-center gap-sm': isDropdownQuestion,
    'flex-col gap-xs': !isDropdownQuestion,
  });

  return (
    <Formik
      initialValues={{ answer }}
      validateOnChange={true}
      validateOnMount={true}
      validationSchema={validationSchema}
      onSubmit={handleSave}>
      {({ isValid }) => (
        <Form>
          <div className='border border-neutral-300 rounded-xs'>
            <div className={headingClasses}>{text}</div>
            <div className={cardContentClasses}>
              <AnswerComponent disabled={!isEditing} name='answer' options={options} />
              <div className='flex justify-end'>
                {!isEditing && (
                  <Button
                    className='w-[80px]'
                    size={buttonSize}
                    variant='primary-outlined'
                    onClick={toggleIsEditing}>
                    {t('common.actions.edit')}
                  </Button>
                )}
                {isEditing && (
                  <Button
                    className='w-[80px]'
                    disabled={!isValid}
                    size={buttonSize}
                    type='submit'
                    variant='primary'>
                    {t('common.actions.save')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
