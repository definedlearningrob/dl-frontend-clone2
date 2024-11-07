import { FormEvent, MutableRefObject, ReactNode } from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import {
  ErrorSchema,
  ErrorTransformer,
  RJSFSchema,
  RJSFValidationError,
  UiSchema,
} from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { t } from 'i18next';
import { omit } from 'lodash-es';

import SharedButton from '@shared/components/Button/Button';

import { FieldTemplate, ObjectFieldTemplate } from '../JsonFormTemplates';
import {
  RadioWidget,
  SelectWidget,
  TextareaWidget,
  TextWidget,
  CheckboxesWidget,
  FileWidget,
  PhoneWidget,
  DateWidget,
} from '../JsonFormWidgets';

import styles from './JsonForm.module.sass';

type Props<T extends RJSFSchema> = {
  formRef: MutableRefObject<Form | null>;
  extraErrors: ErrorSchema<T>;
  formData: IChangeEvent['formData'];
  schema: T;
  actions?: ReactNode;
  additionalActions?: ReactNode;
  uiSchema: UiSchema;
  isSubmitDisabled?: boolean;
  onChange: (data: IChangeEvent, id?: string | undefined) => void;
  onSubmit: (data: IChangeEvent, event: FormEvent) => void;
};

export const JsonForm = <T extends RJSFSchema>({
  formRef,
  extraErrors,
  formData,
  schema,
  uiSchema,
  actions,
  additionalActions,
  onChange,
  onSubmit,
  isSubmitDisabled = false,
}: Props<T>) => {
  const { t } = useTranslation();

  return (
    <Form
      ref={formRef}
      className={styles.jsonForm}
      disabled={isSubmitDisabled}
      extraErrors={extraErrors}
      focusOnFirstError={true}
      formData={formData}
      noHtml5Validate={true}
      omitExtraData={true}
      schema={schema}
      showErrorList={false}
      templates={{
        ButtonTemplates: {
          SubmitButton: (props) => {
            const buttonProps = omit(props, 'uiSchema');

            return (
              <div className={styles.bottomSection}>
                {additionalActions}
                <div className={styles.actionsWrapper}>
                  {actions}
                  <SharedButton
                    id='form-submit-button'
                    type='submit'
                    variant='primary'
                    {...buttonProps}
                    disabled={isSubmitDisabled}>
                    {t('common.actions.submit')}
                  </SharedButton>
                </div>
              </div>
            );
          },
        },
        FieldTemplate,
        ObjectFieldTemplate,
      }}
      transformErrors={transformErrors}
      uiSchema={uiSchema}
      validator={validator}
      widgets={{
        EmailWidget: TextWidget,
        RadioWidget,
        SelectWidget,
        TextareaWidget,
        TextWidget,
        PhoneWidget,
        CheckboxesWidget,
        FileWidget,
        MonthYearWidget: (props) => (
          <DateWidget dateFormat='MM/yyyy' showMonthYear={true} {...props} />
        ),
        DateWidget,
      }}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

const transformErrors: ErrorTransformer = (errors, _uiSchema) => {
  const usedErrors = new Set<string>();

  const workingErorrs = errors.reduce((acc, error) => {
    if (error.property) {
      const { message, stack } = match(error.name)
        .with('type', () => {
          const name = error.stack.substring(1, error.stack.lastIndexOf("'"));

          return {
            message: t('user.postSecondary.commonAppForms.error.thisPropertyIsInvalid'),
            stack: t('user.postSecondary.commonAppForms.error.propertyIsInvalid', { name }),
          };
        })
        .with('const', 'oneOf', () => {
          const name = error.stack.substring(1, error.stack.lastIndexOf("'"));

          return {
            message: t('user.postSecondary.commonAppForms.error.thisPropertyIsRequired'),
            stack: t('user.postSecondary.commonAppForms.error.propertyIsRequired', { name }),
          };
        })
        .with('required', () => {
          const name = error.stack.substring(
            error.stack.indexOf("'") + 1,
            error.stack.lastIndexOf("'")
          );

          return {
            message: t('user.postSecondary.commonAppForms.error.thisPropertyIsRequired'),
            stack: t('user.postSecondary.commonAppForms.error.propertyIsRequired', { name }),
          };
        })
        .with('pattern', () => {
          const name = error.stack.substring(1, error.stack.lastIndexOf("'"));

          return {
            message: t('user.postSecondary.commonAppForms.error.thisPropertyIsInvalid'),
            stack: t('user.postSecondary.commonAppForms.error.propertyIsInvalid', { name }),
          };
        })
        .otherwise(() => ({
          message: error.message,
          stack: error.stack,
        }));

      if (usedErrors.has(error.property)) {
        const index = acc.findIndex((item) => item.property === error.property);
        acc[index] = {
          ...error,
          message,
          stack,
        };

        return acc;
      }

      usedErrors.add(error.property);

      acc.push({
        ...error,
        message,
        stack,
      });

      return acc;
    }

    acc.push(error);

    return acc;
  }, [] as RJSFValidationError[]);

  return workingErorrs;
};
