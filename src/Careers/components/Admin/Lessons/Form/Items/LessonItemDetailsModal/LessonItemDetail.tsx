import { match } from 'ts-pattern';
import { Link } from 'react-router-dom';

import {
  ItemFile,
  LessonItem,
} from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';
import { ItemFileList } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/ItemFileList';

import { formatExternalLink } from '@shared/utils/formatExternalLink';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

type LessonItemValueKey =
  | 'name'
  | 'displayName'
  | 'description'
  | 'files'
  | 'definition'
  | 'source'
  | 'resourceLink'
  | 'term'
  | 'author'
  | 'sourceName'
  | 'content'
  | 'url';

type Props = {
  fieldKey: LessonItemValueKey;
  value: LessonItem[LessonItemValueKey];
};

export const LessonItemDetail = ({ fieldKey, value }: Props) =>
  match(fieldKey)
    .with('files', () => <ItemFileList files={value as ItemFile[]} />)
    .with('source', 'resourceLink', () => (
      <Link
        className='px-sm'
        target='_blank'
        to={{ pathname: formatExternalLink(value as string) }}>
        {value}
      </Link>
    ))
    .with('url', () => (
      <video className='mx-sm' controls={true} height='300px'>
        <source data-testid='lesson-item-video-preview' src={value as string} />
      </video>
    ))
    .otherwise(() => <InjectedContent className='px-sm' content={value as string} />);
