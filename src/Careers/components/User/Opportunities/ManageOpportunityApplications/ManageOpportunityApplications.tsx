import cx from 'classnames';
import { ChangeEvent, useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEmpty, debounce } from 'lodash-es';
import { useUpdateEffect } from 'react-use';

import { ReactComponent as EmptyOpportunityApplicationsIcon } from '@dc/assets/icons/empty-opportunity-applications.svg';
import { ReactComponent as NoApplications } from '@dc/images/no_applications.svg';
import { ApplicationList } from '@dc/components/User/Opportunities/ManageOpportunityApplications/ApplicationList/ApplicationList';
import { ApplicationDetails } from '@dc/components/User/Opportunities/ManageOpportunityApplications/ApplicationDetails/ApplicationDetails';
import { useOpportunityApplicationQuery } from '@dc/graphql/user/hooks/useOpportunityApplicationQuery';
import { DetailsHeader } from '@dc/components/User/Opportunities/ManageOpportunityApplications/DetailsHeader/DetailsHeader';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import useQueryParams from '@shared/hooks/useQueryParams';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ReactComponent as Search } from '@shared/svg/search.svg';

import styles from './ManageOpportunityApplications.module.sass';
import { AutomaticAcceptance } from './AutomaticAcceptance/AutomaticAcceptance';

export const ManageOpportunityApplications = () => {
  const { id } = useParams<{ id: string }>();
  const { params, updateQueryParams } = useQueryParams<{ applicationId: string }>();

  const [studentNameFilter, setStudentNameFilter] = useState('');
  const { data, loading, refetch } = useOpportunityApplicationQuery({ id });

  useEffect(() => {
    if (!data) return;

    const filteredApplications = data.opportunity.filteredApplications.nodes;
    const [firstApplication] = filteredApplications;
    const previouslySelectedApplication = filteredApplications.find(
      (application) => application.id === params.applicationId
    );
    const idToSelect =
      previouslySelectedApplication?.id || firstApplication?.id || params.applicationId;

    updateQueryParams({ applicationId: idToSelect });
  }, [data]);

  const isDesktop = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const enoughLetters = event.target.value.length >= 3;
    setStudentNameFilter(enoughLetters ? event.target.value : '');
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 1000), []);

  useUpdateEffect(() => {
    if (studentNameFilter.length >= 3 || studentNameFilter.length === 0) {
      refetch({ id, filter: { studentFullNameCont: studentNameFilter } });
    }

    return () => debouncedSearch.cancel();
  }, [studentNameFilter]);

  if (loading) return <SharedLoadingSpinner size='medium' />;
  if (!data) return null;

  const { opportunity } = data;

  const zeroApplications = isEmpty(opportunity.applications.nodes);

  const automaticAcceptance = opportunity.automaticAcceptance;
  const applicationsToDisplay = opportunity.filteredApplications.nodes;
  const opportunityName = opportunity.name;

  const applicationListHeaderClassName = cx(styles.topSection, styles.applicationListHeader, {
    [styles.applicationListHeaderWithoutApplication]: zeroApplications,
  });
  const detailsClassName = cx(styles.section, styles.details);
  const linkClassName = cx(styles.link, styles.collapsibleLink);

  const selectedApplication = opportunity.applications.nodes.find(
    (application) => application.id === params.applicationId
  );

  const emptySearchResults = isEmpty(applicationsToDisplay);

  return (
    <div className={styles.container}>
      <div className={applicationListHeaderClassName}>
        <div className={styles.contentWrapper}>
          <h4 className={styles.sectionHeading}>
            {t('opportunityManageApplications.listHeader.heading')}
          </h4>
          <div className={styles.descriptionWrapper}>
            <Tooltip
              className={styles.tooltip}
              delayDuration={300}
              disabled={isDesktop}
              message={opportunityName}>
              <Link className={linkClassName} to={`/opportunities/${id}`}>
                {opportunityName}
              </Link>
            </Tooltip>
            <div className='h-xxs w-xxs bg-neutral-300 rounded-lg' />
            <span className={styles.description}>
              {t('opportunityManageApplications.listHeader.studentCount', {
                count: applicationsToDisplay.length,
              })}
            </span>
          </div>
        </div>
        {!zeroApplications && (
          <TextInput
            Icon={Search}
            className={styles.searchInput}
            iconPlacement='end'
            placeholder={t('opportunityManageApplications.listHeader.search')}
            onChange={debouncedSearch}
          />
        )}
      </div>
      {zeroApplications && (
        <div className={cx(styles.noApplications, 'flex items-center')}>
          <EmptyState
            heading={t('opportunityManageApplications.noApplications.heading')}
            icon={<NoApplications />}>
            <p>{t('opportunityManageApplications.noApplications.info')}</p>
          </EmptyState>
        </div>
      )}
      <>
        {selectedApplication && (
          <DetailsHeader
            opportunityName={opportunityName}
            selectedApplication={selectedApplication}
          />
        )}
        <div className={styles.applicationList}>
          {!emptySearchResults && selectedApplication && (
            <ApplicationList studentNameFilter={studentNameFilter} />
          )}
          {emptySearchResults && studentNameFilter && (
            <div className={styles.emptyApplicationListWrapper}>
              <EmptyState
                heading={t('opportunityManageApplications.list.empty.heading')}
                icon={<EmptyOpportunityApplicationsIcon />}>
                {t('opportunityManageApplications.list.empty.description')}
              </EmptyState>
            </div>
          )}
        </div>
        {!zeroApplications && selectedApplication && (
          <div className={detailsClassName}>
            {automaticAcceptance && <AutomaticAcceptance application={selectedApplication} />}
            {!automaticAcceptance && (
              <ApplicationDetails application={selectedApplication} opportunity={opportunity} />
            )}
          </div>
        )}
      </>
    </div>
  );
};
