import React from 'react';
import { useTranslation } from 'react-i18next';

import { useUserCourseQuery } from '@dc/graphql/user/hooks/useUserCourseQuery';

import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';
import SharedImage from '@shared/components/Image/Image';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
};

export const CourseDetailsModal = ({ isOpen, onClose, courseId }: Props) => {
  const { t } = useTranslation();
  const { data } = useUserCourseQuery({ id: courseId, track: false });

  if (!data) {
    return null;
  }

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          <span>{t('admin.courses.detailsHeading')}</span>
        </SharedModal.Heading>
      </SharedModal.Header>

      <SharedModal.Body>
        <div className='courses__lesson__modal-image'>
          <SharedImage
            alt={t('admin.courses.list.item.altImage')}
            fallbackSrc={data.course.imageUrl}
            src={data.course.thumbnailUrl}
          />
        </div>
        <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
        <p>{data.course.name}</p>
        <h3 className='admin-preview-modal-heading'>{t('admin.courses.pathway')}</h3>
        <p>{data.course.pathway.name}</p>
        <h3 className='admin-preview-modal-heading'>{t('common.fields.common.description')}</h3>
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={cleanInjection(data.course.description)} />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
