import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';
import '@dc/components/Admin/Shared/AffectedResources/AffectedResources.sass';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useQueryParams from '@shared/hooks/useQueryParams';

const separateRouteItems = [
  AFFECTED_RESOURCES_FILED.ASSIGNMENTS,
  AFFECTED_RESOURCES_FILED.COURSES,
  AFFECTED_RESOURCES_FILED.LESSONS,
];

const lessonItems = [AFFECTED_RESOURCES_FILED.ASSIGNMENTS];

AdminSharedAffectedResources.propTypes = {
  id: PropTypes.string,
  isArchving: PropTypes.bool,
  query: PropTypes.object,
  resourcesField: PropTypes.oneOf(Object.values(AFFECTED_RESOURCES_FILED)),
};

function AdminSharedAffectedResources({ id, isArchving, query, resourcesField }) {
  const { t } = useTranslation();
  const { updateQueryParams } = useQueryParams();
  const variables = useMemo(() => ({ id }), [id]);

  useEffect(() => {
    if (isArchving) updateQueryParams({ archiveId: variables?.id });
  }, []);

  const getResourcesFromData = (data) => (data ? Object.values(data)[0]?.[resourcesField] : []);

  const getDesiredLink = (resourceId) => {
    const parsedResourcesField = lessonItems.includes(resourcesField)
      ? `lesson-items/${resourcesField}`
      : resourcesField;
    const resourceParam = separateRouteItems.includes(resourcesField)
      ? `/${resourceId}`
      : `?showId=${resourceId}`;

    return `/admin/${parsedResourcesField}` + resourceParam;
  };

  const loadSpinner = (
    <div className='h-100 w-100 flex justify-center items-center p-base'>
      <SharedLoadingSpinner size='small' />
    </div>
  );

  return (
    <SharedDataLoader
      SpinnerComponent={loadSpinner}
      options={{
        fetchPolicy: 'network-only',
        variables,
      }}
      query={query}>
      {(data) => (
        <div className='affected-resources'>
          {getResourcesFromData(data).length ? (
            <>
              <h4 className='affected-resources__heading'>
                {t('admin.affectedResources.heading', {
                  resources: t(`admin.affectedResources.${resourcesField}`),
                })}
              </h4>
              <div data-testid='affected-resources'>
                {getResourcesFromData(data).map((resource, index) => (
                  <Link
                    key={resource.name + resource.id}
                    className='affected-resources__link'
                    to={getDesiredLink(resource.id)}>
                    {index !== 0 && <span>,&nbsp;</span>}
                    {resource.name}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>
      )}
    </SharedDataLoader>
  );
}

export default AdminSharedAffectedResources;
