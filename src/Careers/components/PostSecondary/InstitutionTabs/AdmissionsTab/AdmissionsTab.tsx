import { useTranslation } from 'react-i18next';
import { groupBy, isEmpty, map, sortBy } from 'lodash-es';
import { useMemo } from 'react';
import dayjs from 'dayjs';

import { TInstitution } from '@dc/resources/types';
import { ReactComponent as PercentIcon } from '@dc/svg/percent.svg';

import SharedIcon from '@shared/components/Icon/Icon';
import { Kicker } from '@shared/components/Kicker';
import { CalendarCard } from '@shared/components/CalendarCard/CalendarCard';

import { InstitutionCard } from '../../InstitutionCard';
import { ScoreRange } from '../../ScoreRange';
import { sortDates } from '../helpers';

import styles from './AdmissionsTab.module.sass';

type Props = {
  institution: TInstitution;
};

const MIN_ACT_SCORE = 1;
const MAX_ACT_SCORE = 36;
const MIN_SAT_SCORE = 200;
const MAX_SAT_SCORE = 800;

const getPercentage = (value: number) => (value * 100).toFixed() + '%';

export const AdmissionsTab = ({ institution }: Props) => {
  const { t } = useTranslation();
  const {
    admissionRate,
    satMathMin,
    satMathMax,
    satReadingMax,
    satReadingMin,
    actMin,
    actMax,
    dates,
    isIpeds: isIpedsInstitution,
  } = institution;

  const admissionRateValue = admissionRate
    ? getPercentage(admissionRate)
    : t('postSecondary.institution.notAvailableShort');

  const importantDates = useMemo(() => {
    const datesByTerm = groupBy(dates, 'term');
    const groupedDates = map(datesByTerm, (dates, term) => ({ term, dates: sortDates(dates) }));

    return sortBy(groupedDates, ({ dates }) => dayjs(dates[0].deadlineDate).toDate());
  }, [dates]);

  return (
    <>
      {isIpedsInstitution && (
        <InstitutionCard
          title={t('postSecondary.institution.admissionsSummary')}
          withSections={false}>
          <div className={styles.cardSection}>
            <div className={styles.admissionRateWrapper}>
              <div className={styles.admissionIconWrapper}>
                <SharedIcon icon={<PercentIcon />} size='md' />
              </div>
              <div>
                <p className={styles.admissionRateLabel}>
                  {t('postSecondary.institution.admissionRate')}
                </p>
                <h4 className={styles.admissionRateValue}>{admissionRateValue}</h4>
              </div>
            </div>
            <ScoreRange
              label={t('postSecondary.institution.averageSatReadingScore')}
              maxScore={MAX_SAT_SCORE}
              maxValue={satReadingMax}
              minScore={MIN_SAT_SCORE}
              minValue={satReadingMin}
            />
            <ScoreRange
              label={t('postSecondary.institution.averageSatMathScore')}
              maxScore={MAX_SAT_SCORE}
              maxValue={satMathMax}
              minScore={MIN_SAT_SCORE}
              minValue={satMathMin}
            />
            <ScoreRange
              label={t('postSecondary.institution.averageActScore')}
              maxScore={MAX_ACT_SCORE}
              maxValue={actMax}
              minScore={MIN_ACT_SCORE}
              minValue={actMin}
            />
          </div>
        </InstitutionCard>
      )}
      {!isEmpty(importantDates) && (
        <InstitutionCard
          description={t('postSecondary.institution.datesConfirmationInfo')}
          title={t('postSecondary.institution.importantDates')}>
          {importantDates.map(({ term, dates }) => (
            <div key={term}>
              <Kicker className='!mb-sm'>{term}</Kicker>
              <div className='grid grid-cols-4 gap-sm xxxl:grid-cols-5 xxxl:gap-base'>
                {dates.map((date) => (
                  <CalendarCard
                    key={`${date.deadlineDate}-${date.decisionType}`}
                    date={date.deadlineDate}
                    description={institution.name}
                    title={date.decisionType}
                  />
                ))}
              </div>
            </div>
          ))}
        </InstitutionCard>
      )}
    </>
  );
};
