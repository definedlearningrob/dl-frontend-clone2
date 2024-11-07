import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TProduct } from '@pbl/components/Project/types';
import projectProductsQuery from '@pbl/graphql/user/queries/projectProducts';

import SharedCard from '@shared/components/Card/Card';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import { Product } from './Product';
import styles from './ProductList.module.sass';

export const ProductList = () => {
  const { t } = useTranslation();
  const { projectId } = useParams<{ projectId: string }>();
  const { data: productsData } = useQuery(projectProductsQuery, {
    variables: { projectId: projectId },
  });

  const { setBackNavButton } = useNavigation();
  const { toggleIsHidden } = useNavigation();

  useEffect(() => {
    setBackNavButton(true, '/');
    toggleIsHidden(true);
  }, []);

  const products = productsData?.project.products;

  return (
    <div>
      <SharedCard.Title className={styles.heading} size='large'>
        {t('user.ltiSearch.products')}
        <div>
          <small>{t('user.ltiSearch.productSelect')}</small>
        </div>
      </SharedCard.Title>
      <section className={styles.list}>
        {products?.map((product: TProduct) => (
          <Product key={product.id} product={product} taskId={projectId} />
        ))}
      </section>
    </div>
  );
};
