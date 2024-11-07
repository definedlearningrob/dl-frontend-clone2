import cx from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

type Props = {
  data: {
    name: string;
    degrees: string;
  }[];
};

export const AcademicsTable = ({ data }: Props) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: 'name' as const,
        label: t('postSecondary.institution.programName'),
      },
      {
        key: 'degrees' as const,
        label: t('postSecondary.institution.programDegree'),
      },
    ],
    []
  );

  const dataCellClasses = 'p-xs border border-neutral-300 xxxl:p-sm first:font-bold';

  const noDataFound = () => (
    <tr>
      <td className={cx(dataCellClasses, 'text-left')} colSpan={2}>
        {t('postSecondary.institution.emptyPrograms')}
      </td>
    </tr>
  );

  return (
    <table className='rounded-tl-xxs rounded-tr-xxs border-spacing-0 w-full text-xs leading-lg'>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className='p-xs bg-neutral-200 border border-neutral-300 font-bold text-left first:w-2/5 xxxl:px-sm xxxl:py-base'>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((dataRow) => (
          <tr key={dataRow.name}>
            {columns.map(({ key }) => (
              <td key={key} className={dataCellClasses}>
                {dataRow[key]}
              </td>
            ))}
          </tr>
        ))}
        {isEmpty(data) && noDataFound()}
      </tbody>
    </table>
  );
};
