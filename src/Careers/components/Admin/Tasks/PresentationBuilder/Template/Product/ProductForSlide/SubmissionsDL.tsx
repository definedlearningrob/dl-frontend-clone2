import { useParams } from 'react-router-dom';

import { SubmissionsMock } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/ProductForSlide/SubmissionsMock';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { ProductIndividualSubmissions } from '@pbl/components/Student/Project/Products/ProductIndividualSubmission/ProductIndividualSubmissions';
import { TProduct } from '@pbl/components/Project/types';
import { ProductTeamSubmissions } from '@pbl/components/Student/Project/Products/ProductTeamSubmission/ProductTeamSubmissions';

import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

type Props = {
  product: TProduct;
};

export const SubmissionsDL = ({ product }: Props) => {
  const {
    userInfo: { uuid },
  } = useUserInfo();

  const { teamId } = useParams<{ teamId?: string }>();

  const SubmissionComponent = !!teamId ? ProductTeamSubmissions : ProductIndividualSubmissions;

  const { isTeacher } = useUserRole();

  if (isTeacher) {
    return <SubmissionsMock />;
  }

  return (
    <div className='[&&_p]:!text-xs'>
      <SubmissionComponent
        disabled={false}
        fileListClassName='max-h-[300px] scrollbar !pr-xs [&_a]:!text-white'
        openModal={() => {}}
        productId={product.id}
        submission={product.submission!}
        uuid={uuid}
      />
    </div>
  );
};
