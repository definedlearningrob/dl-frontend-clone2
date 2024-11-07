import { FieldArray, Form, useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { ReactComponent as BulbIcon } from '@shared/assets/icons/bulb.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { FormNumberInput } from '@shared/components/FormNumberInput/FormNumberInput';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { TagsSelector } from '@shared/components/RubricsEditor/EditRubricsHeadingModal/TagsSelector';
import { cx } from '@shared/utils/cx';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

const infoSectionClassname = cx(
  'flex flex-col justify-end xxxl:justify-center rounded-sm',
  'h-[360px] xxxl:h-[500px]',
  'bg-neutral-200 border border-neutral-300 p-md text-center'
);

export const EditRubricHeadingForm = () => {
  const [nameField, nameMeta] = useField('name');
  const { isSystemAdmin } = useUserRole();

  const { t } = useTranslation();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <Form>
      <h5 className='text-xs mb-xs'>{t('components.rubric.mainInformation')}</h5>
      <div className='flex gap-base'>
        <div className='basis-2/3 flex flex-col gap-y-xs'>
          <TextInput
            errorMessage={(nameMeta.touched && nameMeta.error) || undefined}
            field={nameField}
            isRequired={true}
            label={t('components.rubric.heading')}
            size={isFullHD ? 'md' : 'sm'}
          />
          {isSystemAdmin && (
            <FieldArray
              name='tags'
              render={(formikArrayProps) => <TagsSelector {...formikArrayProps} />}
            />
          )}
        </div>
        <div className='basis-1/3 flex flex-col gap-y-xs'>
          <FormNumberInput
            label={t('components.rubric.multiplier')}
            maxValue={100}
            minValue={1}
            name='multiplier'
            required={true}
            wrapperClassName='mb-sm'
          />
          {isSystemAdmin && (
            <div className={infoSectionClassname}>
              <BulbIcon className='mx-auto mb-sm' />
              <strong className='mb-xs text-xs xxxl:text-sm'>
                {t('components.rubric.performanceIndicatorInfoHeading')}
              </strong>
              <p className='mb-0 leading-lg text-xxs xxxl:text-xs'>
                {t('components.rubric.performanceIndicatorInfo')}
              </p>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};
