import { omitBy, isNil } from 'lodash-es';
import qs from 'qs';

import { TProduct } from '@pbl/components/Project/types';
import useUserInfo from '@pbl/hooks/useUserInfo';
import useProjectQuery from '@pbl/graphql/user/hooks/useProjectQuery';

import Card from '@shared/components/Card/Card';
import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './Product.module.sass';

type Props = {
  product: TProduct;
  taskId: string;
};

export const Product = ({ product, taskId }: Props) => {
  const { userInfo } = useUserInfo();
  const { data: projectData } = useProjectQuery(taskId);

  const handleOnClick = async () => {
    const dataToSend = {
      resourceLinkId: userInfo?.ltiDetails?.ltiResourceLinkId,
      contextId: userInfo?.ltiDetails?.ltiContextId,
      consumerKey: userInfo?.ltiDetails?.ltiConsumerKey,
      taskName: projectData?.project?.displayName,
      productName: product.name,
      userUuid: userInfo?.definedLearningUuid,
      dataId: `dl-${taskId}:${product.id}`,
    };

    window.location.replace(
      `${import.meta.env.VITE_USERS_LTI_HOST}/lti/select_content?data=${window.btoa(
        qs.stringify(omitBy(dataToSend, isNil))
      )}`
    );
  };

  return (
    <div role='button' onClick={handleOnClick}>
      <Card key={product.id} className='user-project__product' dataTestId='user-project-product'>
        <Card.Header className={styles.header}>
          <Card.Title className={styles.title} size='medium'>
            {product.displayName || product.name}
          </Card.Title>
        </Card.Header>
        <Card.Body className={styles.body}>
          <div
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={cleanInjection(product.description)}
            data-testid='user-project-description'
          />
        </Card.Body>
      </Card>
    </div>
  );
};
