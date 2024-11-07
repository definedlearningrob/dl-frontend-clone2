import { Link } from 'react-router-dom';

import { ItemFile } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';

import { formatExternalLink } from '@shared/utils/formatExternalLink';

export const ItemFileList = ({ files }: { files: ItemFile[] }) => (
  <ul data-testid='attachment-modal-files'>
    {files.map((file) => (
      <li key={file.id} className='px-sm' data-testid='attachment-file'>
        <Link target='_blank' to={{ pathname: formatExternalLink(file.url) }}>
          {file.filename}
        </Link>
      </li>
    ))}
  </ul>
);
