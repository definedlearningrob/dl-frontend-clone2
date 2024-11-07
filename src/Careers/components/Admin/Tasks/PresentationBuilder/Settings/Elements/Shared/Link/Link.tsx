import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type {
  TTaskPresentationLink,
  TTaskPresentationSlide,
} from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import { ReactComponent as RemoveIcon } from '@shared/svg/delete_outlined.svg';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { Select } from '@shared/components/Select';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import styles from './Link.module.sass';

type Props = {
  contentId: string;
  onRemove?: (id: string) => void;
};

function AdminTasksPresentationBuilderSettingsElementsLink({ contentId, onRemove }: Props) {
  const { currentSlide, handleUpdateSlide, currentPresentation } = usePresentationBuilder();
  const { t } = useTranslation();

  const link = currentSlide?.content.links.find(
    (link: TTaskPresentationLink) => link.contentId === contentId
  );

  const handleUrlSubmit = async (values: {
    text: string;
    target: { label: string; value: string } | null;
  }) => {
    const linksWithoutCurrent =
      currentSlide?.content.links.filter(
        (link: TTaskPresentationLink) => !(link.contentId === contentId)
      ) || [];

    const newLinks = [
      ...linksWithoutCurrent.map(
        ({ targetName, targetId, contentId, text }: TTaskPresentationLink) => ({
          targetName,
          targetId,
          contentId,
          text,
        })
      ),
      {
        targetName: values.target?.label,
        targetId: values.target?.value,
        contentId,
        text: values.text,
      },
    ];

    handleUpdateSlide(null, { links: newLinks });
  };

  const initialValues = {
    text: link?.text || '',
    target: link ? { value: link.targetId, label: link.targetName } : null,
  };

  const handleRemove = () => onRemove && onRemove(contentId);

  const InputLabel = () => (
    <span className='flex items-center gap-xxs'>
      <IconContainer Icon={ImagePlaceholder} paddingSize='none' size='sm' />
      <span>{t('admin.tasks.presentation.linkLabel', { number: contentId })}</span>
      {onRemove && (
        <DeprecatedIconButton
          className={styles.removeIcon}
          icon={<RemoveIcon />}
          size='xs'
          square={true}
          onClick={handleRemove}
        />
      )}
    </span>
  );

  const slidesOptions = currentPresentation.slides.reduce(
    (acc, slide) => {
      const newSlides = [slide, ...slide.subslides]
        .map((slide: TTaskPresentationSlide) => ({
          value: slide?.id,
          label: slide?.name,
        }))
        .filter((slide: { value: string; label: string }) => slide.value);

      return [...acc, ...newSlides];
    },
    [] as {
      value: string;
      label: string;
    }[]
  );

  return (
    <section>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleUrlSubmit}>
        {({ submitForm, setFieldValue, values }) => (
          <Form>
            <div className='flex flex-col gap-sm'>
              <InputLabel />
              <SharedFormTextInput
                label={t('admin.tasks.presentation.buttonLinkLabel')}
                name='text'
                onBlur={submitForm}
              />
              <Select
                label={t('admin.tasks.presentation.linkToSlideLabel')}
                options={slidesOptions}
                value={values.target}
                onBlur={submitForm}
                onChange={(val) => setFieldValue('target', val)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsLink;
