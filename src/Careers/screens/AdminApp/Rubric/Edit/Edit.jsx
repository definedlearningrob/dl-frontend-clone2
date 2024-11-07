import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { RUBRIC_QUERY } from '@dc/graphql/user/queries/rubric';
import RubricsEdit from '@dc/components/Admin/Rubrics/Edit/Edit';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

function AdminAppRubricEdit() {
  const { rubricId } = useParams();
  const { setBackNavButton } = useNavigation();

  const { data } = useQuery(RUBRIC_QUERY, {
    variables: { id: rubricId },
  });

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  if (!data)
    return (
      <div className='h-screen flex justify-center items-center'>
        <SharedLoadingSpinner color='primary' size='medium' />
      </div>
    );

  return <RubricsEdit rubric={data.rubric} />;
}

export default AdminAppRubricEdit;
