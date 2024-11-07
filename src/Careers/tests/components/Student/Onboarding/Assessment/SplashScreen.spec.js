import { waitFor, fireEvent } from '@testing-library/react';

import { SplashScreen } from '@dc/components/Onboarding/Assessment/SplashScreen/SplashScreen';
import { renderWithRouter } from '@dc/utils/test';

window.HTMLMediaElement.prototype.load = () => {};

const instructionVideoFilenames = {
  1: ['studyPreferences.webm', 'studyPreferences.mp4'],
  2: ['interests.webm', 'interests.mp4'],
  3: ['values.webm', 'values.mp4'],
};

const setDisplaySplashScreenSpy = jest.fn();

const renderSplashScreen = (step) =>
  renderWithRouter(
    <SplashScreen
      assessmentType='HIGH_SCHOOL'
      setDisplaySplashScreen={setDisplaySplashScreenSpy}
      step={step || 1}
    />
  );

describe('OnboardingAssessmentSplashScreen', () => {
  it('renders correctly', () => {
    const { container } = renderSplashScreen();

    expect(container).toBeInTheDocument();
  });

  describe('displays correct instruction video clip on each step', () => {
    it('study preferences step', async () => {
      const { getByTestId } = renderSplashScreen();
      const mainSrc = getByTestId(/splash-video-player/).children[0].children[0];
      const fallBackSrc = getByTestId(/splash-video-player/).children[0].children[1];

      await waitFor(() => {
        expect(mainSrc).toHaveAttribute('src', instructionVideoFilenames[1][0]);
        expect(fallBackSrc).toHaveAttribute('src', instructionVideoFilenames[1][1]);
      });
    });

    it('interests step', async () => {
      const { getByTestId } = renderSplashScreen(2);
      const mainSrc = getByTestId(/splash-video-player/).children[0].children[0];
      const fallBackSrc = getByTestId(/splash-video-player/).children[0].children[1];

      await waitFor(() => {
        expect(mainSrc).toHaveAttribute('src', instructionVideoFilenames[2][0]);
        expect(fallBackSrc).toHaveAttribute('src', instructionVideoFilenames[2][1]);
      });
    });

    it('values step', async () => {
      const { getByTestId } = renderSplashScreen(3);
      const mainSrc = getByTestId(/splash-video-player/).children[0].children[0];
      const fallBackSrc = getByTestId(/splash-video-player/).children[0].children[1];

      await waitFor(() => {
        expect(mainSrc).toHaveAttribute('src', instructionVideoFilenames[3][0]);
        expect(fallBackSrc).toHaveAttribute('src', instructionVideoFilenames[3][1]);
      });
    });
  });

  it('closes splash screen on "Begin" button click', async () => {
    const { getByTestId } = renderSplashScreen();

    expect(getByTestId('button')).toHaveTextContent(/begin/i);

    await waitFor(() => {
      fireEvent.click(getByTestId(/button/));
    });

    await waitFor(() => {
      expect(setDisplaySplashScreenSpy).toHaveBeenCalledTimes(1);
    });
  });
});
