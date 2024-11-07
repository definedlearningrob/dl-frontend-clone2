import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { ApolloError } from '@apollo/client';
import * as Yup from 'yup';

import { ApplicationDetails } from '@dc/components/Opportunities/OpportunityApplicationModal/ApplicationDetails';
import { ApplicationQuestions } from '@dc/components/Opportunities/OpportunityApplicationModal/ApplicationQuestions';
import { useOpportunityQuery } from '@dc/graphql/student/hooks/useOpportunityQuery';
import { useCreateOpportunityApplication } from '@dc/graphql/student/hooks/useCreateOpportunityApplication';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

import { ApplicationActions } from './ApplicationActions';

type Props = {
  id: string;
  showModal: boolean;
  onClose: () => void;
  isReadOnly: boolean;
};

export type ApplicationFormValues = {
  answer: string;
  questionId: string;
}[];

export const OpportunityApplication = ({ id, showModal, onClose, isReadOnly }: Props) => {
  const [applyToOpportunity] = useCreateOpportunityApplication();
  const { t } = useTranslation();
  const { data } = useOpportunityQuery({
    id,
  });

  const validationSchema = Yup.array().of(
    Yup.object().shape({
      answer: Yup.string().required(t('validation.messages.required')),
    })
  );

  const handleSave = async (values: ApplicationFormValues) => {
    try {
      await applyToOpportunity({ opportunityId: +id, answers: values });
      callToast('success', t('opportunities.opportunitiesModal.success'));
      onClose();
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('opportunities.opportunitiesModal.error'));
      }
      onClose();
    }
  };

  if (!data) {
    return null;
  }

  const { opportunity } = data;
  const { questions } = opportunity;

  const initialValues = questions.map((question) => ({
    answer: '',
    questionId: question.id,
  }));

  return (
    <SharedModal isOpen={showModal} variant='wide' onDismiss={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}>
        <Form>
          <SharedModal.Header>
            <SharedModal.Heading>
              {isReadOnly
                ? t('opportunities.opportunitiesModal.previewTitle')
                : t('opportunities.opportunitiesModal.title')}
            </SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body className='flex'>
            <div className='flex gap-[calc(2*theme(spacing.sm))] w-full'>
              <ApplicationDetails opportunity={opportunity} />
              <ApplicationQuestions
                answers={data.opportunity.opportunityApplication?.answers}
                isReadOnly={isReadOnly}
                questions={questions}
              />
            </div>
          </SharedModal.Body>
          <SharedModal.Footer>
            <ApplicationActions isReadOnly={isReadOnly} onCancel={onClose} />
          </SharedModal.Footer>
        </Form>
      </Formik>
    </SharedModal>
  );
};
