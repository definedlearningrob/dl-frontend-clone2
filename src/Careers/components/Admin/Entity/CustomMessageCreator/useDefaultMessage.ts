import { useTranslation } from 'react-i18next';

export const useDefaultMessage = () => {
  const { t } = useTranslation();

  const studentInitialMessage = '';
  const teacherInitialDefaultMessageDC =
    '<p>Defined Careers provides career exploration and experience for all students. For help with Defined Careers, please go to the <a href="https://support.definedlearning.com/article/228-defined-learning-updated-knowledge-base" target="_blank" rel="noopener">Knowledge Base</a>, our support page that features resources and quick tutorial videos to assist you in activities such as viewing student progress, assigning career courses, and other activities within Defined Careers.</p>';
  const teacherInitialMessageDC = `<h2>${t(
    'user.dashboard.welcomeMessage.header'
  )}</h2>\n${teacherInitialDefaultMessageDC}`;

  const teacherInitialDefaultMessageDL =
    '<p>For help with Defined Learning, please visit our <a href="https://support.definedlearning.com/article/228-defined-learning-updated-knowledge-base">Knowledge Base</a>, where you can find helpful resources and quick tutorial videos.</p>';

  const teacherInitialMessageDL = `<h2>${t(
    'user.dashboard.welcomeMessage.headerDL'
  )}</h2>\n${teacherInitialDefaultMessageDL}`;

  return { studentInitialMessage, teacherInitialMessageDC, teacherInitialMessageDL };
};
