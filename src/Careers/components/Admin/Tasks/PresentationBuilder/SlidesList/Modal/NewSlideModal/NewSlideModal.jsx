import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { NewSlideTabs } from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/Modal/NewSlideModal/consts';
import { LibraryTab } from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/Modal/NewSlideModal/LibraryTab';
import { TemplatesTab } from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/Modal/NewSlideModal/TemplatesTab';
import { QuickProjectsTab } from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/Modal/NewSlideModal/QuickProjectsTab';

import SharedModal from '@shared/components/Modal/Modal';
import { Tabs } from '@shared/components/Tabs/Tabs';
import Card from '@shared/components/Card/Card';
import { useFeatureFlags } from '@shared/components/FeatureProvider';

AdminTasksPresentationBuilderSlidesListNewSlideModal.propTypes = {
  closeModal: PropTypes.func,
};

function AdminTasksPresentationBuilderSlidesListNewSlideModal({ closeModal }) {
  const { t } = useTranslation();
  const { currentPresentation } = usePresentationBuilder();
  const { QUICK_PROJECT_ON } = useFeatureFlags();

  const usedSlideIds = currentPresentation.slides.reduce((acc, current) => {
    const subSlideIds = current.subSlides?.map((subSlide) => subSlide.id) || [];

    return [...acc, current.id, ...subSlideIds];
  }, []);

  const tabs = [
    { tabId: NewSlideTabs.TEMPLATES, label: t('admin.tasks.presentation.templates') },
    { tabId: NewSlideTabs.LIBRARY, label: t('admin.tasks.presentation.library') },
    {
      ...(QUICK_PROJECT_ON && {
        tabId: NewSlideTabs.QUICK_PROJECTS,
        label: t('admin.tasks.presentation.quickProjects'),
      }),
    },
  ].filter(Boolean);

  return (
    <SharedModal className='!h-[600px] xxxl:min-h-[61vh]' isOpen={true} onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.tasks.presentation.addNewSlide')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className=''>
        <Tabs defaultTabId={NewSlideTabs.TEMPLATES}>
          <Tabs.List tabs={tabs} withPadding={false} withQueryParams={false} />
          <Card>
            <Tabs.Content tabId={NewSlideTabs.TEMPLATES}>
              <div>
                <TemplatesTab closeModal={closeModal} />
              </div>
            </Tabs.Content>
            <Tabs.Content tabId={NewSlideTabs.LIBRARY}>
              <div>
                <LibraryTab closeModal={closeModal} usedSlideIds={usedSlideIds} />
              </div>
            </Tabs.Content>
            {QUICK_PROJECT_ON && (
              <Tabs.Content tabId={NewSlideTabs.QUICK_PROJECTS}>
                <div>
                  <QuickProjectsTab closeModal={closeModal} />
                </div>
              </Tabs.Content>
            )}
          </Card>
        </Tabs>
      </SharedModal.Body>
    </SharedModal>
  );
}

export default AdminTasksPresentationBuilderSlidesListNewSlideModal;
