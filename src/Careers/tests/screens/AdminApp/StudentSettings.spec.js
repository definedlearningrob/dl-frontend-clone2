import { fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import StudentSettings from '@dc/screens/AdminApp/StudentSettings/StudentSettings';
import studentQuery from '@dc/graphql/user/queries/student';
import updateStudentSettingsMutation from '@dc/graphql/user/mutations/updateStudentSettings';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const defaultSettings = {
  assessmentEnabled: {
    origin: 'INDIVIDUAL',
    value: false,
    __typename: 'AssessmentEnabledSettings',
  },
  assessmentType: {
    origin: 'INDIVIDUAL',
    value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
    __typename: 'AssessmentTypeSettings',
  },
  onboardingEnabled: {
    origin: 'INDIVIDUAL',
    value: false,
    __typename: 'OnboardingEnabledSettings',
  },
  selfEvaluationEnabled: {
    origin: 'INDIVIDUAL',
    value: true,
    __typename: 'SelfEvaluationEnabledSettings',
  },
};

const defaultMock = (settings) => [
  {
    request: {
      query: studentQuery,
      variables: { uuid: undefined },
    },
    result: {
      data: {
        student: {
          archivedAt: '',
          currentCourses: [],
          entity: {
            name: 'Harvard University',
            uuid: '1',
            __typename: 'Entity',
          },
          email: '',
          firstName: 'Carolina',
          lastName: 'Stanton',
          settings,
          uuid: '1',
          __typename: 'Student',
        },
      },
    },
  },
];

const renderStudent = (mocks = [], settings = defaultSettings) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMock(settings), ...mocks]}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <StudentSettings />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

describe('AdminAppStudentSettings', () => {
  it('renders student full name and entity name correctly', async () => {
    const { getByTestId } = renderStudent();

    await waitFor(() => {
      expect(getByTestId(/student-name/)).toHaveTextContent(/carolina stanton/i);
      expect(getByTestId(/student-entity-name/)).toHaveTextContent(/harvard university/i);
    });
  });

  describe('settings', () => {
    describe('assessment', () => {
      it('switch displays current setting correcly', async () => {
        const { container, getByTestId } = renderStudent();

        await waitFor(() => {
          expect(getByTestId(/assessment-switch/)).not.toBeDisabled();
          expect(getByTestId(/assessment-switch/)).not.toBeChecked();
          expect(container).toHaveTextContent('Assessment (individual)');
        });
      });

      it('updates setting correctly', async () => {
        const updateSettingsSpy = jest.fn();

        const updateStudentSettingsMock = {
          request: {
            query: updateStudentSettingsMutation,
            variables: {
              input: {
                uuid: '1',
                settings: {
                  assessmentEnabled: true,
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateStudentSettings: {
                  student: {
                    firstName: '',
                    lastName: '',
                    settings: {
                      assessmentEnabled: {
                        origin: '',
                        value: '',
                      },
                      assessmentType: {
                        origin: '',
                        value: '',
                      },
                      onboardingEnabled: {
                        origin: '',
                        value: '',
                      },
                      selfEvaluationEnabled: {
                        origin: '',
                        value: '',
                      },
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        const { getByTestId } = renderStudent([updateStudentSettingsMock], {
          assessmentEnabled: {
            origin: 'INDIVIDUAL',
            value: false,
            __typename: 'AssessmentEnabledSettings',
          },
          assessmentType: {
            origin: 'INDIVIDUAL',
            value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            __typename: 'AssessmentTypeSettings',
          },
          onboardingEnabled: {
            origin: 'INDIVIDUAL',
            value: false,
            __typename: 'OnboardingEnabledSettings',
          },
          selfEvaluationEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'OnboardingEnabledSettings',
          },
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/assessment-switch/));
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/save-settings-button/));
        });

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches onboarding off when is on and changing assessment to off', async () => {
        const updateSettingsSpy = jest.fn();

        const updateStudentSettingsMock = {
          request: {
            query: updateStudentSettingsMutation,
            variables: {
              input: {
                uuid: '1',
                settings: {
                  onboardingEnabled: false,
                  assessmentEnabled: false,
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateStudentSettings: {
                  student: {
                    firstName: '',
                    lastName: '',
                    settings: {
                      assessmentEnabled: {
                        origin: '',
                        value: '',
                      },
                      assessmentType: {
                        origin: '',
                        value: '',
                      },
                      onboardingEnabled: {
                        origin: '',
                        value: '',
                      },
                      selfEvaluationEnabled: {
                        origin: '',
                        value: '',
                      },
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        const { getByTestId } = renderStudent([updateStudentSettingsMock], {
          assessmentEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'AssessmentEnabledSettings',
          },
          assessmentType: {
            origin: 'INDIVIDUAL',
            value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            __typename: 'AssessmentTypeSettings',
          },
          onboardingEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'OnboardingEnabledSettings',
          },
          selfEvaluationEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'OnboardingEnabledSettings',
          },
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/assessment-switch/));
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/save-settings-button/));
        });

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('onboarding', () => {
      it('switch displays current setting correcly', async () => {
        const { container, getByTestId } = renderStudent([], {
          assessmentEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'AssessmentEnabledSettings',
          },
          assessmentType: {
            origin: 'INDIVIDUAL',
            value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            __typename: 'AssessmentTypeSettings',
          },
          onboardingEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'OnboardingEnabledSettings',
          },
          selfEvaluationEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'OnboardingEnabledSettings',
          },
        });

        await waitFor(() => {
          expect(getByTestId(/onboarding-switch/)).not.toBeDisabled();
          expect(getByTestId(/onboarding-switch/)).toBeChecked();
          expect(container).toHaveTextContent('Onboarding (individual)');
        });
      });

      it('updates setting correctly', async () => {
        const updateSettingsSpy = jest.fn();

        const updateStudentSettingsMock = {
          request: {
            query: updateStudentSettingsMutation,
            variables: {
              input: {
                uuid: '1',
                settings: {
                  onboardingEnabled: true,
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateStudentSettings: {
                  student: {
                    firstName: '',
                    lastName: '',
                    settings: {
                      assessmentEnabled: {
                        origin: '',
                        value: '',
                      },
                      assessmentType: {
                        origin: '',
                        value: '',
                      },
                      onboardingEnabled: {
                        origin: '',
                        value: '',
                      },
                      selfEvaluationEnabled: {
                        origin: '',
                        value: '',
                      },
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        const { getByTestId } = renderStudent([updateStudentSettingsMock], {
          assessmentEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'AssessmentEnabledSettings',
          },
          assessmentType: {
            origin: 'INDIVIDUAL',
            value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            __typename: 'AssessmentTypeSettings',
          },
          onboardingEnabled: {
            origin: 'INDIVIDUAL',
            value: false,
            __typename: 'OnboardingEnabledSettings',
          },
          selfEvaluationEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'OnboardingEnabledSettings',
          },
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/onboarding-switch/));
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/save-settings-button/));
        });

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches assessment on when is off and changing onboarding to on', async () => {
        const updateSettingsSpy = jest.fn();

        const updateStudentSettingsMock = {
          request: {
            query: updateStudentSettingsMutation,
            variables: {
              input: {
                uuid: '1',
                settings: {
                  onboardingEnabled: true,
                  assessmentEnabled: true,
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateStudentSettings: {
                  student: {
                    firstName: '',
                    lastName: '',
                    settings: {
                      assessmentEnabled: {
                        origin: '',
                        value: '',
                      },
                      assessmentType: {
                        origin: '',
                        value: '',
                      },
                      onboardingEnabled: {
                        origin: '',
                        value: '',
                      },
                      selfEvaluationEnabled: {
                        origin: '',
                        value: '',
                      },
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        const { getByTestId } = renderStudent([updateStudentSettingsMock], {
          assessmentEnabled: {
            origin: 'INDIVIDUAL',
            value: false,
            __typename: 'AssessmentEnabledSettings',
          },
          assessmentType: {
            origin: 'INDIVIDUAL',
            value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            __typename: 'AssessmentTypeSettings',
          },
          onboardingEnabled: {
            origin: 'INDIVIDUAL',
            value: false,
            __typename: 'OnboardingEnabledSettings',
          },
          selfEvaluationEnabled: {
            origin: 'INDIVIDUAL',
            value: true,
            __typename: 'OnboardingEnabledSettings',
          },
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/onboarding-switch/));
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/save-settings-button/));
        });

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('middleSchool', () => {
      it('switch displays current setting correcly', async () => {
        const { container, getByTestId } = renderStudent();

        await waitFor(() => {
          expect(getByTestId(/middleSchool-switch/)).not.toBeChecked();
          expect(container).toHaveTextContent('Middle School (individual)');
        });
      });

      it('updates setting correctly', async () => {
        const updateSettingsSpy = jest.fn();

        const updateStudentSettingsMock = {
          request: {
            query: updateStudentSettingsMutation,
            variables: {
              input: {
                uuid: '1',
                settings: {
                  assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateStudentSettings: {
                  student: {
                    firstName: '',
                    lastName: '',
                    settings: {
                      assessmentEnabled: {
                        origin: '',
                        value: '',
                      },
                      assessmentType: {
                        origin: '',
                        value: '',
                      },
                      onboardingEnabled: {
                        origin: '',
                        value: '',
                      },
                      selfEvaluationEnabled: {
                        origin: '',
                        value: '',
                      },
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        const { getByTestId } = renderStudent([updateStudentSettingsMock]);

        await waitFor(() => {
          fireEvent.click(getByTestId(/middleSchool-switch/));
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/save-settings-button/));
        });

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('self evaluation', () => {
      it('switch displays current setting correcly', async () => {
        const { container, getByTestId } = renderStudent();

        await waitFor(() => {
          expect(getByTestId(/self-evaluation-switch/)).toBeChecked();
          expect(container).toHaveTextContent('Self evaluation enabled (individual)');
        });
      });

      it('updates setting correctly', async () => {
        const updateSettingsSpy = jest.fn();

        const updateStudentSettingsMock = {
          request: {
            query: updateStudentSettingsMutation,
            variables: {
              input: {
                uuid: '1',
                settings: {
                  selfEvaluationEnabled: false,
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateStudentSettings: {
                  student: {
                    firstName: '',
                    lastName: '',
                    settings: {
                      assessmentEnabled: {
                        origin: '',
                        value: '',
                      },
                      assessmentType: {
                        origin: '',
                        value: '',
                      },
                      onboardingEnabled: {
                        origin: '',
                        value: '',
                      },
                      selfEvaluationEnabled: {
                        origin: '',
                        value: '',
                      },
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        const { getByTestId } = renderStudent([updateStudentSettingsMock]);

        await waitFor(() => {
          fireEvent.click(getByTestId(/self-evaluation-switch/));
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/save-settings-button/));
        });

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
