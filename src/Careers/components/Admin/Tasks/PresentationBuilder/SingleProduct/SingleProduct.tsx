import { useToggle } from 'react-use';
import { useEffect } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import styles from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/5ProductChoice/FiveProductChoice.module.sass';
import ImageUpload from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/Shared/ImageUpload/ImageUpload';
import Link from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/Shared/Link/Link';
import { withoutHtmlTag } from '@dc/utils/withoutHtmlTag';
import { PresentationTextEditor } from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationTextEditor/PresentationTextEditor';

import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import SharedIcon from '@shared/components/Icon/Icon';

type Props = {
  items: { id: string; type: string }[];
  imageId: string;
  linkId: string;
  productDescription?: TTaskPresentationText;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  contentStyle: string;
  productTitle?: TTaskPresentationText;
};

export const SingleProduct = ({
  imageId,
  linkId,
  productDescription,
  shouldShowElement,
  handleEditorChange,
  contentStyle,
  items,
  productTitle,
}: Props) => {
  const { selectedSlideContent } = usePresentationBuilder();
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  useEffect(() => {
    if (selectedSlideContent) {
      const shouldBeExpanded = items.some(
        (item) => item.id === selectedSlideContent.id && item.type === selectedSlideContent.type
      );
      toggleIsExpanded(shouldBeExpanded);
    }
  }, [selectedSlideContent]);

  const classNames = cx(
    styles.header,
    'flex justify-between items-center text-font-primary cursor-pointer font-medium mb-sm',
    {
      [styles.expanded]: isExpanded,
    }
  );

  const shouldShowTitle =
    productTitle && shouldShowElement({ type: 'text', id: productTitle.contentId });

  const shouldShowImage = shouldShowElement({ type: 'image', id: imageId });

  const shouldShowDescription =
    productDescription &&
    shouldShowElement({
      type: 'text',
      id: productDescription.contentId,
    });
  const shouldShowLink = shouldShowElement({ type: 'link', id: linkId });

  if (![shouldShowDescription, shouldShowLink, shouldShowImage, shouldShowTitle].includes(true)) {
    return null;
  }

  const hasEditableTitle = productTitle && !isEmpty(productTitle?.contentId);

  return (
    <>
      {productTitle && (
        <div className={classNames} onClick={toggleIsExpanded}>
          {withoutHtmlTag(productTitle.value)}
          <SharedIcon icon={<ChevronRightIcon />} size='sm' />
        </div>
      )}
      {isExpanded && (
        <div className={styles.content}>
          {hasEditableTitle && (
            <PresentationTextEditor
              contentStyle={contentStyle}
              handleEditorChange={handleEditorChange}
              text={productTitle}
            />
          )}
          {shouldShowImage && <ImageUpload contentId={linkId} />}
          {shouldShowDescription && (
            <PresentationTextEditor
              contentStyle={contentStyle}
              handleEditorChange={handleEditorChange}
              text={productDescription}
            />
          )}
          {shouldShowLink && <Link contentId={linkId} />}
        </div>
      )}
    </>
  );
};
