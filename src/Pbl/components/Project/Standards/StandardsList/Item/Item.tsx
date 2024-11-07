import Accordion from '@shared/components/Accordion/Accordion';

import './Item.sass';

type Props = {
  grade: string;
  standards: TStandard[];
  subject: string;
};

type TStandard = {
  standardNumber: string;
  standardText: string;
};

function StandardsListItem({ grade, standards, subject }: Props) {
  const title = `${grade} - ${subject}`;

  const sortedStandards = standards.sort((a, b) =>
    a.standardNumber.localeCompare(b.standardNumber, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  );

  return (
    <div data-testid='user-project-standard-group'>
      <Accordion classNamePrefix='standards-accordion' title={title}>
        <ul>
          {sortedStandards.map((standard) => (
            <li
              key={standard.standardNumber}
              className='standards-accordion__content-item'
              data-testid='user-project-standard-item'>
              <span className='standards-accordion__content-header'>
                {standard.standardNumber} -{' '}
              </span>
              <span className='standards-accordion__content-text'>{standard.standardText}</span>
            </li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
}

export default StandardsListItem;
