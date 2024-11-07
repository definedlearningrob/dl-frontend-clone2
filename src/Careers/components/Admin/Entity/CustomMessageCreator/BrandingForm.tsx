import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { useToggle } from 'react-use';

import { CreatorFormModal } from '@dc/components/Admin/Entity/CustomMessageCreator/CreatorFormModal/CreatorFormModal';
import { TEntity } from '@dc/graphql/user/queries/entity';
import { MessageActions } from '@dc/components/Admin/Entity/CustomMessageCreator/MessageActions';
import { LogoDetails } from '@dc/graphql/user/mutations/updateEntity';
import { BrandingFields } from '@dc/components/Admin/Entity/CustomMessageCreator/BrandingFields/BrandingFields';
import { DCLogo } from '@dc/shared/DCLogo/DCLogo';
import LogoType from '@dc/svg/logotype.svg';
import { useDefaultMessage } from '@dc/components/Admin/Entity/CustomMessageCreator/useDefaultMessage';
import { useEntitySettingsUpdate } from '@dc/graphql/user/hooks/useEntitySettingsUpdate';
import { TabCard } from '@dc/components/Admin/Entity/TabCard';

import DLLogoType from '@pbl/svg/DLLogoBLue.svg';
import { DLLogo } from '@pbl/components/DLLogo/DLLogo';

import { ReactComponent as StarsIcon } from '@shared/svg/stars.svg';
import DefinedIcon from '@shared/svg/DefinedLogoIcon.svg';

type Props = {
  entity: TEntity;
};

export type BrandingFormType = {
  dcLogo: LogoDetails;
  dcIcon: LogoDetails;
  dlLogo: LogoDetails;
  dlIcon: LogoDetails;
  welcomeMessage: {
    dcStudent: string;
    dcTeacher: string;
    dlStudent: string;
    dlTeacher: string;
  };
  applyToHierarchy: boolean;
};

export const BrandingForm = ({ entity }: Props) => {
  const { t } = useTranslation();
  const [isCustomEditorModalOpen, toggleCustomEditorModal] = useToggle(false);
  const [handleUpdateEntity] = useEntitySettingsUpdate();
  const { studentInitialMessage, teacherInitialMessageDC, teacherInitialMessageDL } =
    useDefaultMessage();
  const { welcomeMessage } = entity;
  const { dcStudent, dcTeacher, dlStudent, dlTeacher } = welcomeMessage || {};

  const initialValues: BrandingFormType = {
    dcLogo: { uuid: null, filename: null, url: entity.dcLogoUrl || '' },
    dcIcon: { uuid: null, filename: null, url: entity.dcIconUrl || '' },
    dlLogo: { uuid: null, filename: null, url: entity.dlLogoUrl || '' },
    dlIcon: { uuid: null, filename: null, url: entity.dlIconUrl || '' },
    welcomeMessage: {
      dcStudent: dcStudent || studentInitialMessage,
      dcTeacher: dcTeacher || teacherInitialMessageDC,
      dlStudent: dlStudent || studentInitialMessage,
      dlTeacher: dlTeacher || teacherInitialMessageDL,
    },
    applyToHierarchy: false,
  };

  const handleSubmit = async (values: BrandingFormType) => {
    toggleCustomEditorModal(false);
    await handleUpdateEntity(entity.uuid, values);
  };

  return (
    <TabCard
      description={t('admin.entities.tabs.appearanceDescription')}
      icon={StarsIcon}
      title={t('admin.entities.tabs.appearance')}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div>
            <h6 className='text-sm leading-base font-bold text-neutral-800'>
              {t('admin.entities.customizeMessage.modalSidebar')}
            </h6>
            <p className='text-xs leading-sm font-regular text-neutral-700'>
              {t('admin.entities.customizeMessage.modalSidebarInfo')}
            </p>
            <div className='flex gap-base xxxl:gap-md pt-sm xxxl:pt-md'>
              <BrandingFields
                fallBackIcon={DefinedIcon}
                fallBackLogo={LogoType}
                logo={<DCLogo />}
                nameIcon='dcIcon'
                nameLogo='dcLogo'
                studentMessage='dcStudent'
                teacherMessage='dcTeacher'
              />
              <BrandingFields
                fallBackIcon={DefinedIcon}
                fallBackLogo={DLLogoType}
                logo={<DLLogo />}
                nameIcon='dlIcon'
                nameLogo='dlLogo'
                studentMessage='dlStudent'
                teacherMessage='dlTeacher'
              />
            </div>
          </div>
          <MessageActions toggleCustomEditorModal={toggleCustomEditorModal} />
          {isCustomEditorModalOpen && (
            <CreatorFormModal entityDetails={entity} onCloseModal={toggleCustomEditorModal} />
          )}
        </Form>
      </Formik>
    </TabCard>
  );
};
