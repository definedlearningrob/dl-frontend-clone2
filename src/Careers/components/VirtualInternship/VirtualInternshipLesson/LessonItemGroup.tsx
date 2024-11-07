import {
  TAssignment,
  TAttachment,
  TResearchLink,
  TText,
  TVideo,
  TVocabulary,
} from '@dc/components/Student/Lesson/types';

import {
  AssignmentCard,
  AttachmentCard,
  ResearchLinksCard,
  TextCard,
  VideoCard,
  VocabularyCard,
} from './LessonItem';

export type LessonItemGroup = (
  | {
      type: TVocabulary['__typename'];
      items: TVocabulary[];
    }
  | {
      type: TText['__typename'];
      items: TText[];
    }
  | {
      type: TAttachment['__typename'];
      items: TAttachment[];
    }
  | {
      type: TVideo['__typename'];
      items: TVideo[];
    }
  | {
      type: TAssignment['__typename'];
      items: TAssignment[];
    }
  | {
      type: TResearchLink['__typename'];
      items: TResearchLink[];
    }
) & {
  id: string;
};

type Props = {
  lessonItemGroup: LessonItemGroup;
  virtualInternshipId: string;
  isPreviewOnly?: boolean;
};

export const LessonItemGroup = ({ lessonItemGroup, virtualInternshipId, isPreviewOnly }: Props) => {
  switch (lessonItemGroup.type) {
    case 'Vocabulary':
      return <VocabularyCard id={lessonItemGroup.id} vocabularies={lessonItemGroup.items} />;
    case 'Text':
      return (
        <>
          {lessonItemGroup.items.map((text) => (
            <TextCard key={text.id} text={text} />
          ))}
        </>
      );
    case 'Assignment':
      return (
        <>
          {lessonItemGroup.items.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              isPreviewOnly={isPreviewOnly}
              virtualInternshipId={virtualInternshipId}
            />
          ))}
        </>
      );
    case 'Attachment':
      return (
        <>
          {lessonItemGroup.items.map((attachment) => (
            <AttachmentCard key={attachment.id} attachment={attachment} />
          ))}
        </>
      );
    case 'Video':
      return (
        <>
          {lessonItemGroup.items.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </>
      );
    case 'ResearchLink':
      return <ResearchLinksCard id={lessonItemGroup.id} researchLinks={lessonItemGroup.items} />;
    default:
      return null;
  }
};
