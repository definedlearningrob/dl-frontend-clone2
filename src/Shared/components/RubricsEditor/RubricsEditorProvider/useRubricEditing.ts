import { useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { UPDATE_RUBRIC_HEADING_DC } from '@dc/graphql/user/mutations/updateRubricHeading';

import { UPDATE_RUBRIC_HEADING_DL } from '@pbl/graphql/user/mutations/updateRubricHeading';

import createRubricCriteriaLabelMutation from '@shared/graphql/user/mutations/createRubricCriteriaLabel';
import updateRubricCriteriaLabelMutation from '@shared/graphql/user/mutations/updateRubricCriteriaLabel';
import deleteRubricCriteriaLabelMutation from '@shared/graphql/user/mutations/deleteRubricCriteriaLabel';
import createRubricCriteriaMutation from '@shared/graphql/user/mutations/createRubricCriteria';
import updateRubricCriteriaMutation from '@shared/graphql/user/mutations/updateRubricCriteria';
import createRubricHeadingMutation from '@shared/graphql/user/mutations/createRubricHeading';
import deleteRubricHeadingMutation from '@shared/graphql/user/mutations/deleteRubricHeading';
import { getFormErrors, removeFromCache } from '@shared/utils/graphql';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

import { RubricCriteria, RubricData } from '../utils/types';

export const useRubricEditing = (rubric: RubricData) => {
  const [createRubricCriteriaLabel] = useMutation(createRubricCriteriaLabelMutation);
  const [createRubricHeading] = useMutation(createRubricHeadingMutation);
  const [deleteCriteriaLabel] = useMutation(deleteRubricCriteriaLabelMutation);
  const [updateCriteriaLabel] = useMutation(updateRubricCriteriaLabelMutation);
  const [createCriteria] = useMutation(createRubricCriteriaMutation);
  const [updateCriteria] = useMutation(updateRubricCriteriaMutation);
  const [hoveredColumnId, setHoveredColumnId] = useState<null | string>('');
  const { t } = useTranslation();

  const lastCriteriaLabel = useMemo(
    () => rubric.criteriaLabels[rubric.criteriaLabels.length - 1],
    [rubric]
  );

  const addColumn = async () => {
    await createRubricCriteriaLabel({
      variables: {
        input: {
          rubricId: rubric.id,
          score: lastCriteriaLabel?.score + 1 || 1,
        },
      },
      update: (cache, { data }) => {
        const criteriaLabel = data.createRubricCriteriaLabel.rubricCriteriaLabel;

        cache.modify({
          id: cache.identify({ id: rubric.id, __typename: 'Rubric' }),
          fields: {
            criteriaLabels: (existingCriteriasLabels) => {
              const newCriteriaLabelRef = { __ref: cache.identify(criteriaLabel) };

              return [...existingCriteriasLabels, newCriteriaLabelRef];
            },
          },
        });
      },
    });
  };

  const addRow = async () => {
    await createRubricHeading({
      variables: {
        input: {
          rubricId: rubric.id,
          name: t('components.rubric.defaultHeading'),
          multiplier: 1,
        },
      },
      update: (cache, { data }) => {
        const heading = data.createRubricHeading.rubricHeading;
        cache.modify({
          id: cache.identify({ id: rubric.id, __typename: 'Rubric' }),
          fields: {
            headings: (existingHeadings) => {
              const newHeadingRef = { __ref: cache.identify(heading) };

              return [...existingHeadings, newHeadingRef];
            },
          },
        });
      },
    });
  };

  const handleCriteriaLabelDelete = async (id: string) => {
    await deleteCriteriaLabel({
      variables: { input: { id } },
      update: removeFromCache({ id, __typename: 'RubricCriteriaLabel' }),
    });
  };

  const handleCriteriaLabelSubmit = async (
    { id, score, displayName }: { id: string; score: any; displayName: string },
    callback?: () => void,
    setErrors?: (error: unknown) => void
  ) => {
    try {
      await updateCriteriaLabel({
        variables: {
          input: {
            id,
            score: parseInt(score.value),
            displayName,
          },
        },
        optimisticResponse: {
          updateRubricCriteriaLabel: {
            rubricCriteriaLabel: {
              displayName,
              id,
              score: parseInt(score.value),
            },
          },
        },
      });
      callback && callback();
    } catch (error) {
      //@ts-ignore
      const errors = getFormErrors(error);

      setErrors && setErrors(errors);
    }
  };

  const handleCriteriaSubmit = async (
    { id, rubricHeadingId, rubricCriteriaLabelId, text }: RubricCriteria,
    setErrors?: (error: unknown) => void,
    callback?: () => void
  ) => {
    try {
      if (!id) {
        await createCriteria({
          variables: {
            input: {
              rubricHeadingId,
              rubricCriteriaLabelId,
              text,
            },
          },
          update: (cache, { data }) => {
            const criteria = data.createRubricCriteria.rubricCriteria;
            cache.modify({
              id: cache.identify({ id: rubric.id, __typename: 'Rubric' }),
              fields: {
                criterias: (existingCriterias) => {
                  const newCriteriaRef = { __ref: cache.identify(criteria) };

                  return [...existingCriterias, newCriteriaRef];
                },
              },
            });
          },
        });
      } else {
        await updateCriteria({
          variables: {
            input: {
              id,
              text,
            },
          },
        });
      }
      callback && callback();
    } catch (error: unknown) {
      //@ts-ignore
      const errors = getFormErrors(error);
      setErrors && setErrors(errors);
    }
  };

  const { isSystemAdmin } = useUserRole();

  const [updateHeading] = useMutation(
    isSystemAdmin ? UPDATE_RUBRIC_HEADING_DC : UPDATE_RUBRIC_HEADING_DL
  );
  const [deleteHeading] = useMutation(deleteRubricHeadingMutation);

  const handleHeadingSubmit = ({
    id,
    name,
    multiplier,
    tagIds,
  }: {
    id: string;
    name: string;
    multiplier: number;
    tagIds?: string[];
  }) =>
    updateHeading({
      variables: {
        input: {
          id,
          name,
          multiplier,
          tagIds,
        },
      },
    });

  const handleHeadingDelete = async (id: string) => {
    await deleteHeading({
      variables: { input: { id } },
      update: removeFromCache({ id, __typename: 'RubricHeading' }),
    });
  };

  return {
    addColumn,
    addRow,
    handleCriteriaLabelDelete,
    handleCriteriaLabelSubmit,
    handleCriteriaSubmit,
    handleHeadingSubmit,
    handleHeadingDelete,
    hoveredColumnId,
    setHoveredColumnId,
  };
};
