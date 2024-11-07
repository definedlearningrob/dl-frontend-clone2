import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

import middleSchoolInterestMp4 from '@dc/assets/videos/middleSchoolInterests.mp4';
import middleSchoolInterestsWebm from '@dc/assets/videos/middleSchoolInterests.webm';
import interestsMp4 from '@dc/assets/videos/interests.mp4';
import interestsWebm from '@dc/assets/videos/interests.webm';
import studyPreferencesMp4 from '@dc/assets/videos/studyPreferences.mp4';
import studyPreferencesWebm from '@dc/assets/videos/studyPreferences.webm';
import valuesMp4 from '@dc/assets/videos/values.mp4';
import valuesWebm from '@dc/assets/videos/values.webm';
import surveyMp4 from '@dc/assets/videos/survey.mp4';
import surveyWebm from '@dc/assets/videos/survey.webm';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';

import SharedButton from '@shared/components/Button/Button';

type CommonProps = { setDisplaySplashScreen: (value: boolean) => void; step: number };

type Props = CommonProps &
  (
    | {
        assessmentType: string;
        customTitle?: never;
      }
    | {
        assessmentType?: never;
        customTitle: string;
      }
  );

type Steps = 'step1' | 'step2' | 'step3' | 'step4';

type InstructionVideo = Record<Steps, string[]>;

export const SplashScreen = ({
  assessmentType,
  customTitle,
  setDisplaySplashScreen,
  step,
}: Props) => {
  const { t } = useTranslation();

  const processTimesNumber = {
    1: assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL ? 2 : 4,
    2: assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL ? 36 : 6,
    3: assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL ? 15 : 30,
    4: 5,
  }[step];

  const instructionVideo = {
    step1: [studyPreferencesWebm, studyPreferencesMp4],
    step2:
      assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL
        ? [middleSchoolInterestsWebm, middleSchoolInterestMp4]
        : [interestsWebm, interestsMp4],
    step3: [valuesWebm, valuesMp4],
    step4: [surveyWebm, surveyMp4],
  }[`step${step}` as keyof InstructionVideo];

  const closeSplashScreen = () => setDisplaySplashScreen(false);

  const instructions = t(
    `student.onboarding.assessment.splashScreen.step${step}.instructionPoints`,
    {
      returnObjects: true,
      processTimesNumber,
    }
  ) as string[];

  return (
    <>
      <section className='flex flex-col pt-base xxxl:pt-[150px] items-center'>
        <h2 className='text-font-primary text-2lg mb-sm'>
          {customTitle ?? t(`student.onboarding.assessment.splashScreen.step${step}.title`)}
        </h2>
        <p className='text-center text-base xxxl:w-1/2 mb-lg'>
          {t(`student.onboarding.assessment.splashScreen.step${step}.goal`)}
        </p>
        <div className='max-w-[1200px] flex'>
          <ReactPlayer
            className='splash-screen__player'
            controls={false}
            data-testid='splash-video-player'
            loop={true}
            playing={true}
            url={instructionVideo}
          />
          <ol className='splash-screen__instruction-list'>
            {instructions.map((instruction) => (
              <li
                key={instruction}
                className='splash-screen__instruction-item leading-lg text-font-secondary'>
                {instruction}
              </li>
            ))}
            <SharedButton
              className='min-w-[200px] w-fit mx-auto'
              id='splash-screen-button'
              variant='primary'
              onClick={closeSplashScreen}>
              {t('student.onboarding.assessment.splashScreen.buttonText')}
            </SharedButton>
          </ol>
        </div>
      </section>
    </>
  );
};
