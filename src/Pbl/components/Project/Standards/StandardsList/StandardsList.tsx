import { useTranslation } from 'react-i18next';

import { groupBy } from '@pbl/utils/groupBy';

import ListItem from './Item/Item';

type Props = {
  standards: TStandard[];
};

type TStandard = {
  grade: string;
  standardNumber: string;
  standardText: string;
  subject: string;
};

type TStandardGroup = {
  grade: string;
  subject: string;
  items: TStandard[];
};

const sortBySubjectAndGrade = (standards: TStandardGroup[]) =>
  standards.sort(
    (a, b) => a.subject.localeCompare(b.subject) || parseInt(a.grade) - parseInt(b.grade)
  );

function ProjectStandardsList({ standards }: Props) {
  const { t } = useTranslation();

  const parsedStandards = sortBySubjectAndGrade([
    ...groupBy<TStandardGroup>(standards, ['grade', 'subject']),
  ]);

  const renderList = () =>
    parsedStandards.length > 0 ? (
      parsedStandards.map((standard) => (
        <ListItem
          key={standard.grade + standard.subject}
          grade={standard.grade}
          standards={standard.items}
          subject={standard.subject}
        />
      ))
    ) : (
      <div>{t('project.standard.empty')}</div>
    );

  return <div className='user-project__standards'>{renderList()}</div>;
}

export default ProjectStandardsList;
