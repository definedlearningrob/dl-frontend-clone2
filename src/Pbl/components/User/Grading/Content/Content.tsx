import { Route } from 'react-router-dom';

import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';
import { TProjectInfoCheckinData } from '@pbl/graphql/user/queries/projectInfoToCheckinGrade';
import { TProjectInfoProductData } from '@pbl/graphql/user/queries/projectInfoToProductGrade';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import GradingContentHeader from '../GradingHeader';
import GradingCheckinBody from '../GradingCheckinBody';
import GradingProductBody from '../GradingProductBody';
import GradingContentFooter from '../GradingFooter';
import { useGradingContext } from '../GradingContext/GradingContext';
import useProjectInfo from '../helpers/useProjectInfo';
import { TeamGradingCheckinBody } from '../TeamGradingCheckinBody';
import { TeamGradingProductBody } from '../TeamGradingProductBody';

import styles from './Content.module.sass';

type Props = {
  type: GRADING_ITEM_TYPES;
};

const CHECK_IN_GRADING_PATH_BASE = '/projects/:projectId/grading/checkins/:checkinId/:classId';
const PRODUCT_GRADING_PATH_BASE = '/projects/:projectId/grading/products/:productId/:classId';

const getGradingContentBody = (
  type: GRADING_ITEM_TYPES,
  data: TProjectInfoCheckinData | TProjectInfoProductData,
  isTeamGrading?: boolean
) => {
  const checkInQuestionGradingPath = isTeamGrading
    ? `${CHECK_IN_GRADING_PATH_BASE}/teams/:teamId`
    : `${CHECK_IN_GRADING_PATH_BASE}/:studentId`;
  const productGradingPath = isTeamGrading
    ? `${PRODUCT_GRADING_PATH_BASE}/teams/:teamId`
    : `${PRODUCT_GRADING_PATH_BASE}/:studentId`;

  switch (type) {
    case GRADING_ITEM_TYPES.CHECK_IN_QUESTION:
      return {
        Component: isTeamGrading ? TeamGradingCheckinBody : GradingCheckinBody,
        path: checkInQuestionGradingPath,
        //@ts-ignore
        itemName: data.project.checkInQuestion.question,
      };
    case GRADING_ITEM_TYPES.PRODUCT:
      return {
        Component: isTeamGrading ? TeamGradingProductBody : GradingProductBody,
        path: productGradingPath,
        //@ts-ignore
        itemName: data.project.product.displayName,
      };
  }
};

const GradingContent = ({ type }: Props) => {
  const {
    navigation: { projectId, itemId, isTeamGrading },
  } = useGradingContext();
  const { data, loading, error } = useProjectInfo(projectId, itemId, type);

  if (loading || error || !data) {
    return (
      <section className={styles.content}>
        <SharedLoadingSpinner size='small' />
      </section>
    );
  }

  const { Component, itemName, path } = getGradingContentBody(type, data, isTeamGrading);

  return (
    <section className={styles.content}>
      <GradingContentHeader
        itemName={itemName}
        projectName={data.project.displayName}
        type={type}
      />
      <Route exact={true} path={path}>
        <Component />
        <GradingContentFooter />
      </Route>
    </section>
  );
};

export default GradingContent;
