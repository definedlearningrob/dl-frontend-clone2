import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { useRecommendOpportunity } from '@dc/graphql/user/hooks/useRecommendOpportunity';

import SharedModal from '@shared/components/Modal/Modal';
import { TreeSelectList } from '@shared/components/TreeSelectList';
import { callToast } from '@shared/components/Toaster/Toaster';

import { useStudentOptions } from './useStudentOptions';

type Props = {
  opportunityId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const RecommendOpportunityModal = ({ opportunityId, isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const { studentOptions, isLoading } = useStudentOptions({ skip: !isOpen });
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [recommendOpportunity, { loading }] = useRecommendOpportunity();

  const handleClose = () => {
    onClose();
    setSelectedStudents([]);
  };

  const handleRecommend = async () => {
    await recommendOpportunity(opportunityId, selectedStudents);
    callToast(
      'success',
      t('opportunities.recommendModal.opportunityRecommended', { count: selectedStudents.length })
    );
    handleClose();
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={handleClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('opportunities.recommendModal.recommendOpportunity')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <TreeSelectList
          isLoading={isLoading}
          isRequired={true}
          label={t('opportunities.recommendModal.addStudents')}
          options={studentOptions}
          placeholder={t('opportunities.recommendModal.searchByName')}
          value={selectedStudents}
          onChange={setSelectedStudents}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={handleClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button disabled={loading} variant='primary' onClick={handleRecommend}>
          {t('opportunities.recommendModal.recommend')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
