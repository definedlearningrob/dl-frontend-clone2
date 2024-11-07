import ReactPlayer from 'react-player';

import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';
import { TVideo } from '@dc/components/Student/Lesson/types';

type Props = {
  video: TVideo;
};

export const VideoCard = ({ video }: Props) => {
  const { id, displayName, description, url, __typename } = video;
  const cardId = `${id}-${__typename}`;

  return (
    <LessonItemCard key={id} description={description} id={cardId} title={displayName}>
      <ReactPlayer controls={true} height='fit-content' url={url} width='100%' />
    </LessonItemCard>
  );
};
