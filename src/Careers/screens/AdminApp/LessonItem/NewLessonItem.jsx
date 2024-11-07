import { useParams } from 'react-router-dom';

import NewAssignment from '@dc/components/Admin/LessonItems/Assignments/New/New';
import NewAttachment from '@dc/components/Admin/LessonItems/Attachments/New/New';
import NewResearchLink from '@dc/components/Admin/LessonItems/ResearchLinks/New/New';
import NewText from '@dc/components/Admin/LessonItems/Texts/New/New';
import NewVideo from '@dc/components/Admin/LessonItems/Videos/New/New';
import NewVocabulary from '@dc/components/Admin/LessonItems/Vocabularies/New/New';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import NewPresentations from '@dc/components/Admin/LessonItems/ExternalPresentations/New/New';

function NewLessonItem() {
  const { type } = useParams();

  const getComponent = (type) =>
    ({
      assignment: {
        Component: NewAssignment,
      },
      attachment: {
        Component: NewAttachment,
      },
      externalPresentation: {
        Component: NewPresentations,
      },
      researchLink: {
        Component: NewResearchLink,
      },
      text: {
        Component: NewText,
      },
      video: {
        Component: NewVideo,
      },
      vocabulary: {
        Component: NewVocabulary,
      },
    }[type]);

  const { Component } = getComponent(type);

  return (
    <SharedMainContent>
      <Component />
    </SharedMainContent>
  );
}

export default NewLessonItem;
