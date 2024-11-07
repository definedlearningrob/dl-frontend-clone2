import { Form, useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { isEmpty } from 'lodash-es';

import SharedModal from '@shared/components/Modal/Modal';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { ReactComponent as CertificateIcon } from '@shared/svg/certificate.svg';
import { ReactComponent as QuestionIcon } from '@shared/svg/question.svg';
import { ToggleSwitchTile } from '@shared/components/ToggleSwitchTile';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { cx } from '@shared/utils/cx';

import { ClearButton } from './ClearButton';
import { QuestionTypeSelect } from './QuestionTypeSelect';
import { FormValues } from './StatementModal';
import { QUESTION_TYPES_WITH_OPTIONS } from './constants';

type Props = {
  buttonText?: string;
  onClose: () => void;
};

export const StatementForm = ({ onClose, buttonText }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const [requiredField, _] = useField('required');
  const { values } = useFormikContext<FormValues>();
  const isQuestionWithOptions = QUESTION_TYPES_WITH_OPTIONS.includes(values.question.questionType);

  const isFormFilled = useMemo(() => {
    if (isQuestionWithOptions) {
      return values.question.options.every((option) => !isEmpty(option.option));
    }

    return !isEmpty(values.name);
  }, [values]);

  const itemSize = isFullHD ? 'md' : 'sm';

  return (
    <Form>
      <SharedModal.Body
        className={cx('text-xs flex gap-base xxxl:gap-[64px]', {
          'h-[495px] xxxl:h-[647px]': isQuestionWithOptions,
        })}>
        <div className='flex-1'>
          <h6 className='text-xs xxxl:text-sm mb-xs'>
            {t('admin.planGroups.statements.mainInformation')}
          </h6>
          <p className='text-font-secondary leading-lg mb-x xxxl:mb-sm'>
            {t('admin.planGroups.statements.mainInformationDescription')}
          </p>
          <SharedFormTextInput
            Icon={CertificateIcon}
            className='mb-x xxxl:mb-sm'
            errorMessage=''
            iconPlacement='start'
            isRequired={true}
            label={t('common.fields.common.name')}
            name='name'
            placeholder={t('admin.planGroups.statements.enterStatement')}
            size={itemSize}
          />
          <ToggleSwitchTile
            Icon={InfoIcon}
            description={t('admin.planGroups.statements.requiredStatementDescription')}
            isEnabled={requiredField.value}
            name='required'
            title={t('admin.planGroups.statements.markAsRequired')}
            variant='sm'
            onChange={requiredField.onChange}
          />
        </div>
        <div className='flex-1'>
          <div className='flex gap-xs justify-between items-start'>
            <div>
              <h6 className='text-xs xxxl:text-sm mb-xs'>
                {t('admin.planGroups.statements.questionConfiguration')}
              </h6>
              <p className='text-font-secondary leading-lg mb-x xxxl:mb-sm'>
                {t('admin.planGroups.statements.questionConfigurationDescription')}
              </p>
            </div>
            <ClearButton />
          </div>
          <SharedFormTextInput
            Icon={QuestionIcon}
            className='mb-x xxxl:mb-sm'
            iconPlacement='start'
            isRequired={false}
            label={t('admin.planGroups.statements.question')}
            name='question.text'
            placeholder={t('admin.planGroups.statements.enterQuestion')}
            size={itemSize}
          />
          <QuestionTypeSelect />
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button size={itemSize} variant='primary-outlined' onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          disabled={!isFormFilled}
          size={itemSize}
          type='submit'
          variant='primary'>
          {buttonText || t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </Form>
  );
};
