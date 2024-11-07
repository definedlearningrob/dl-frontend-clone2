import { useParams } from 'react-router-dom';

import LessonItemWrapper from '@dc/components/Admin/LessonItem/Wrapper/Wrapper';
import ResearchLink from '@dc/components/Student/Lesson/ResearchLink/ResearchLink';
import researchLinkQuery from '@dc/graphql/user/queries/researchLink';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminLessonItemResearchLink() {
  const { id } = useParams();

  return (
    <LessonItemWrapper>
      <SharedDataLoader options={{ variables: { id } }} query={researchLinkQuery}>
        {({ researchLink }) => <ResearchLink previewOnly={true} researchLinks={[researchLink]} />}
      </SharedDataLoader>
    </LessonItemWrapper>
  );
}

export default AdminLessonItemResearchLink;
