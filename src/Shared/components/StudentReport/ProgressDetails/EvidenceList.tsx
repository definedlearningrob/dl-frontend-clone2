import { Trans } from 'react-i18next';
import { isEmpty, noop } from 'lodash-es';

import { EvidencesListItem } from '@shared/components/EvidenceListItem/EvidencesListItem';
import { TEvidence } from '@shared/resources/types';

type Props = {
  evidence: TEvidence[];
};

export const EvidenceList = ({ evidence }: Props) => {
  if (isEmpty(evidence)) {
    return null;
  }

  return (
    <div className='flex flex-col gap-xxs xxxl:gap-xs'>
      <h5 className='mb-0 text-xxs leading-base uppercase'>
        <Trans
          components={{
            neutralText: <span className='text-neutral-600' />,
          }}
          i18nKey='studentGoalReport.evidenceCount'
          values={{ count: evidence.length }}
        />
      </h5>
      <ul>
        {evidence.map((evidenceItem) => (
          <li key={evidenceItem.id} className='mx-sm my-x'>
            <EvidencesListItem
              {...evidenceItem}
              interactive={false}
              onDelete={noop}
              onNavigate={noop}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
