import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useRubricQuery } from '@pbl/graphql/user/hooks/useRubricQuery';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import { RubricsEditHeader } from '@shared/components/RubricsEditor/RubricsEditHeader/RubricsEditHeader';
import { RubricsEditorProvider } from '@shared/components/RubricsEditor/RubricsEditorProvider';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { RubricsEditor } from '@shared/components/RubricsEditor';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Card from '@shared/components/Card/Card';

export const RubricEdit = () => {
  const { setBackNavButton } = useNavigation();
  const { rubricId } = useParams<{ rubricId: string }>();
  const { data, loading } = useRubricQuery(rubricId);

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  if (loading || !data) return <SharedLoadingSpinner />;

  return (
    <SharedMainContent>
      <Card>
        <RubricsEditHeader rubric={data.rubric} />
        <RubricsEditorProvider rubric={data.rubric}>
          <RubricsEditor />
        </RubricsEditorProvider>
      </Card>
    </SharedMainContent>
  );
};
