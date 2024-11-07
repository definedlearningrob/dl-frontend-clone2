import { useMutation } from '@apollo/client';
import { Form, Formik, type FormikValues } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';
import dayjs from 'dayjs';

import UPDATE_EXTENSION, {
  type TUpdateExtensionData,
  type TUpdateExtensionVariables,
} from '@dc/graphql/user/mutations/updateExtensionField';
import { type TExtensionField } from '@dc/graphql/user/queries/extensionField';
import { getFormErrors } from '@dc/utils/graphql';

import FullPageCard from '@shared/components/FullPageCard/FullPageCard';

import ExtensionEditAssignment from './Assignment/Assignment';
import ExtensionEditDates from './Dates/Dates';
import ExtensionEditHeader from './Header/Header';
import ExtensionsEditFooter from './Footer/Footer';

type Props = { extension: TExtensionField };

export type TExtensionAssignment = {
  clusters: {
    id: string;
    name: string;
  }[];
  courses: {
    id: string;
    name: string;
  }[];
  pathways: {
    id: string;
    name: string;
  }[];
  publishedFrom: Date;
  publishedTo: Date | null;
  status: 'PUBLISHED' | 'DRAFT';
};

type TErrorFields = {
  status: string;
  publishedFrom: string;
};

const ExtensionEdit = ({ extension }: Props) => {
  const [updateExtension] = useMutation<TUpdateExtensionData, TUpdateExtensionVariables>(
    UPDATE_EXTENSION
  );
  const { t } = useTranslation();

  const history = useHistory();

  const initialValues = {
    clusters: extension.clusters.map(({ id, name }) => ({ id, name })),
    courses: extension.courses.map(({ id, name }) => ({ id, name })),
    pathways: extension.pathways.map(({ id, name }) => ({ id, name })),
    publishedFrom: extension.publishedFrom ? new Date(extension.publishedFrom) : new Date(),
    publishedTo: extension.publishedTo ? new Date(extension.publishedTo) : null,
    status: 'PUBLISHED',
  };

  const validationSchema = yup.object().shape({
    publishedFrom: yup.date().required(t('common.fields.common.required')),
  });

  const parseDate = (date: string, type: 'from' | 'to') =>
    type === 'from'
      ? dayjs(date).startOf('day').toISOString()
      : dayjs(date).endOf('day').toISOString();

  const handleOnSubmit = async (values: FormikValues) => {
    try {
      await updateExtension({
        variables: {
          input: {
            clusterIds: values.clusters.map(({ id }: { id: string }) => id),
            courseIds: values.courses.map(({ id }: { id: string }) => id),
            id: extension.id,
            pathwayIds: values.pathways.map(({ id }: { id: string }) => id),
            publishedFrom: parseDate(values.publishedFrom, 'from'),
            publishedTo: values.publishedTo ? parseDate(values.publishedTo, 'to') : null,
            status: values.status,
          },
        },
      });
      history.goBack();
    } catch (e) {
      getFormErrors<TErrorFields>(e as { graphQLErrors: GraphQLError[] });
    }
  };

  return (
    <FullPageCard size='sm'>
      <ExtensionEditHeader />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        <Form>
          <ExtensionEditDates publishedTo={extension.publishedTo} />
          <ExtensionEditAssignment assignedCourses={extension.courses} />
          <ExtensionsEditFooter />
        </Form>
      </Formik>
    </FullPageCard>
  );
};

export default ExtensionEdit;
