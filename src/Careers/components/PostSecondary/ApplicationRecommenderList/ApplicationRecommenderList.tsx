import { useInstitutionApplication } from '@dc/graphql/student/hooks/useInstitutionApplication';
import { InstitutionApplication } from '@dc/graphql/student/queries/institutionApplication';
import { RecommenderFormList } from '@dc/components/PostSecondary/RecommenderFormList/RecommenderFormList';
import { INSTITUTION_APPLICATION_STATUS, RECOMMENDER_TYPE } from '@dc/resources/enums';

type Props = {
  selectedApplication: InstitutionApplication;
};

export const ApplicationRecommenderList = ({ selectedApplication }: Props) => {
  const { data, loading } = useInstitutionApplication(selectedApplication.id);

  if (!data) {
    return null;
  }

  const counselorForms = data.institutionApplication.recommenders.filter(
    (recommender) => recommender.type === RECOMMENDER_TYPE.COUNSELOR
  );
  const shouldCounselorSectionBeClosed = counselorForms.every((form) =>
    form.formStatuses?.every((status) => status.status === INSTITUTION_APPLICATION_STATUS.COMPLETED)
  );

  return (
    <>
      {data.institutionApplication.recommenders.map((recommender, index) => (
        <RecommenderFormList
          key={index}
          loading={loading}
          recommender={recommender}
          shouldCounselorSectionBeClosed={shouldCounselorSectionBeClosed}
        />
      ))}
    </>
  );
};
