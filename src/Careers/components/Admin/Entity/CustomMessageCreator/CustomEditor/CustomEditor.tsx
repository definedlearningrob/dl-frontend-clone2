import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';

import Card from '@shared/components/Card/Card';

type Props = {
  studentMessage: string;
  teacherMessage: string;
};

export const CustomEditor = ({ studentMessage, teacherMessage }: Props) => {
  const { t } = useTranslation();
  const [studentField, , studentHelpers] = useField(`welcomeMessage.${studentMessage}`);
  const [teacherField, , teacherHelpers] = useField(`welcomeMessage.${teacherMessage}`);
  const editorConfigStudent = {
    onChange: studentHelpers.setValue,
    value: studentField.value,
  };
  const editorConfigTeacher = {
    onChange: teacherHelpers.setValue,
    value: teacherField.value,
  };

  return (
    <Card withoutPadding={true}>
      <div className='flex flex-col gap-base xxxl:gap-md'>
        <SharedTextEditor
          editorConfig={editorConfigStudent}
          id={studentField?.name}
          label={t('admin.entities.customizeMessage.studentLabel')}
          labelClass='!text-xs !font-regular'
        />
        <SharedTextEditor
          editorConfig={editorConfigTeacher}
          id={teacherField?.name}
          label={t('admin.entities.customizeMessage.teacherLabel')}
          labelClass='!text-xs !font-regular'
        />
      </div>
    </Card>
  );
};
