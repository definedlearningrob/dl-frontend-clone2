import { Trans, useTranslation } from 'react-i18next';

import styles from './FutureChecklist.module.sass';

type Props = {
  showAdditionalContent: boolean;
};

export const FutureChecklist = ({ showAdditionalContent }: Props) => {
  const { t } = useTranslation();
  const listLink = 'text-primary-500 underline';
  const futureChecklistData = [
    {
      heading: t('student.postSecondary.experiencePhase.buildExperiences'),
      list: [
        { label: t('student.postSecondary.experiencePhase.opportunities') },
        { label: t('student.postSecondary.experiencePhase.extracurricular') },
        { label: t('student.postSecondary.experiencePhase.writeResume') },
      ],
    },
    {
      heading: t('student.postSecondary.explorationPhase.exploration'),
      list: [
        { label: t('student.postSecondary.explorationPhase.conductPostSecondary') },
        { label: t('student.postSecondary.explorationPhase.collegeFair') },
        { label: t('student.postSecondary.explorationPhase.visitTheInstitutions') },
      ],
    },
    {
      heading: t('student.postSecondary.applicationPhase.application'),
      list: [
        {
          label: (
            <Trans i18nKey='student.postSecondary.applicationPhase.setUpCommon'>
              <a
                className={listLink}
                href='https://apply.commonapp.org/createaccount'
                target='_blank'>
                mock
              </a>
            </Trans>
          ),
        },
        {
          label: (
            <Trans i18nKey='student.postSecondary.applicationPhase.connectCommonApp'>
              <a
                className={listLink}
                href='https://support.definedlearning.com/category/436-application-module'
                target='_blank'>
                mock
              </a>
            </Trans>
          ),
          hidden: !showAdditionalContent,
        },
        {
          label: (
            <Trans i18nKey='student.postSecondary.applicationPhase.completeFAFSA'>
              <a className={listLink} href='https://studentaid.gov/h/apply-for-aid' target='_blank'>
                mock
              </a>
            </Trans>
          ),
        },
        {
          label: (
            <Trans i18nKey='student.postSecondary.applicationPhase.searchOpportunities'>
              <a
                className={listLink}
                href='https://www.careeronestop.org/Toolkit/Training/find-scholarships.aspx'
                target='_blank'>
                mock
              </a>
            </Trans>
          ),
        },
        {
          label: (
            <Trans i18nKey='student.postSecondary.applicationPhase.identifyEducators'>
              <a
                className={listLink}
                href='https://support.definedlearning.com/category/436-application-module'
                target='_blank'>
                mock
              </a>
            </Trans>
          ),
        },
        { label: t('student.postSecondary.applicationPhase.applyToSelected') },
      ],
    },
  ];

  let indexNumber = 0;

  return (
    <div className='flex flex-col h-full'>
      <h4 className='text-sm mb-0 xxxl:text-base'>
        {t('student.postSecondary.futureChecklist.heading')}
      </h4>
      <ol className={styles.list}>
        {futureChecklistData.map((element, indexArr) => (
          <div key={indexArr}>
            <h6 className={styles.listDivider}>{element.heading}</h6>
            {element.list
              .filter((visibleListItem) => !visibleListItem.hidden)
              .map((checklistItem, index) => {
                indexNumber += 1;

                return (
                  <li
                    key={index}
                    className='flex justify-start items-center text-neutral-700 mb-xs font-regular text-xs xxxl:text-sm xxxl:mb-x'>
                    <div className={styles.customMarker}>{indexNumber}</div>
                    <span className='text-neutral-700 text-xs leading-lg font-medium'>
                      {checklistItem.label}
                    </span>
                  </li>
                );
              })}
          </div>
        ))}
      </ol>
    </div>
  );
};
