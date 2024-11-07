import { useParams } from 'react-router-dom';

import EditAssignment from '@dc/components/Admin/LessonItems/Assignments/Edit/Edit';
import EditAttachment from '@dc/components/Admin/LessonItems/Attachments/Edit/Edit';
import EditPresentation from '@dc/components/Admin/LessonItems/ExternalPresentations/Edit/Edit';
import EditResearchLink from '@dc/components/Admin/LessonItems/ResearchLinks/Edit/Edit';
import EditTexts from '@dc/components/Admin/LessonItems/Texts/Edit/Edit';
import EditVideo from '@dc/components/Admin/LessonItems/Videos/Edit/Edit';
import EditVocabulary from '@dc/components/Admin/LessonItems/Vocabularies/Edit/Edit';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { ASSIGNMENT_QUERY } from '@dc/graphql/user/queries/assignment';
import attachmentQuery from '@dc/graphql/user/queries/attachment';
import { EXTERNAL_PRESENTATION_QUERY } from '@dc/graphql/user/queries/externalPresentation';
import researchLinkQuery from '@dc/graphql/user/queries/researchLink';
import textQuery from '@dc/graphql/user/queries/text';
import videoQuery from '@dc/graphql/user/queries/video';
import vocabularyQuery from '@dc/graphql/user/queries/vocabulary';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminAppLessonItemEdit() {
  const { type, id } = useParams();

  const getQueryAndInnerComponent = (type) =>
    ({
      assignment: {
        query: ASSIGNMENT_QUERY,
        InnerComponent: EditAssignment,
      },
      attachments: {
        query: attachmentQuery,
        InnerComponent: EditAttachment,
      },
      externalPresentations: {
        query: EXTERNAL_PRESENTATION_QUERY,
        InnerComponent: EditPresentation,
      },
      'research-links': {
        query: researchLinkQuery,
        InnerComponent: EditResearchLink,
      },
      texts: {
        query: textQuery,
        InnerComponent: EditTexts,
      },
      videos: {
        query: videoQuery,
        InnerComponent: EditVideo,
      },
      vocabularies: {
        query: vocabularyQuery,
        InnerComponent: EditVocabulary,
      },
    }[type]);

  const { query, InnerComponent } = getQueryAndInnerComponent(type);

  return (
    <SharedMainContent>
      <SharedDataLoader options={{ variables: { id } }} query={query}>
        {(data) => <InnerComponent {...data} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppLessonItemEdit;
