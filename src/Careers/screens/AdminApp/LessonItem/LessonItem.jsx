import { useParams } from 'react-router-dom';

import Assignment from '@dc/components/Admin/LessonItem/Assignment/Assignment';
import Attachment from '@dc/components/Admin/LessonItem/Attachment/Attachment';
import Presentation from '@dc/components/Admin/LessonItem/Presentation/Presentation';
import ResearchLink from '@dc/components/Admin/LessonItem/ResearchLink/ResearchLink';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import Text from '@dc/components/Admin/LessonItem/Text/Text';
import Video from '@dc/components/Admin/LessonItem/Video/Video';
import Vocabulary from '@dc/components/Admin/LessonItem/Vocabulary/Vocabulary';

function AdminAppLessonItem() {
  const { type } = useParams();

  const LessonItemComponent = {
    'research-links': ResearchLink,
    assignments: Assignment,
    attachments: Attachment,
    externalPresentations: Presentation,
    texts: Text,
    videos: Video,
    vocabularies: Vocabulary,
  }[type];

  return (
    <SharedMainContent>
      <LessonItemComponent />
    </SharedMainContent>
  );
}

export default AdminAppLessonItem;
