import { fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import SchoolClass from '@dc/screens/AdminApp/SchoolClass/SchoolClass';
import schoolClassQuery from '@dc/graphql/user/queries/schoolClass';
import updateSchoolClassSettingsMutation from '@dc/graphql/user/mutations/updateSchoolClassSettings';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const defaultMocks = [
  {
    request: {
      query: schoolClassQuery,
      variables: { uuid: undefined },
    },
    result: {
      data: {
        schoolClass: {
          isDemo: false,
          name: 'Class 1',
          uuid: '1',
          entity: {
            name: 'Harvard University',
            uuid: '1',
            __typename: 'Entity',
          },
          settings: {
            assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            __typename: 'SchoolClassSettings',
          },
          __typename: 'SchoolClass',
        },
      },
    },
  },
];

const renderSchoolClass = (mocks = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMocks, ...mocks]}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <SchoolClass />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

describe('AdminAppSchoolClass', () => {
  it('renders school class name and entity name correctly', async () => {
    const { getByTestId } = renderSchoolClass();

    await waitFor(() => {
      expect(getByTestId(/school-class-name/)).toHaveTextContent(/class 1/i);
      expect(getByTestId(/school-class-entity-name/)).toHaveTextContent(/harvard university/i);
    });
  });

  describe('settings', () => {
    describe('middleSchool setting', () => {
      it('switch displays current setting correcly', async () => {
        const { getByTestId } = renderSchoolClass();

        await waitFor(() => {
          expect(getByTestId(/middleSchool-switch/)).not.toBeChecked();
        });
      });

      it("updates setting with overwrite all students' individual settings", async () => {
        const updateSettingsSpy = jest.fn();

        const updateSchoolClassSettingsMock = {
          request: {
            query: updateSchoolClassSettingsMutation,
            variables: {
              input: {
                uuid: '1',
                force: true,
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
                updateSchoolClassSettings: {
                  schoolClass: {
                    settings: {
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                    },
                    students: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: {
                              origin: '',
                              value: '',
                            },
                          },
                          uuid: '',
                        },
                      ],
                    },
                    uuid: '',
                  },
                },
              },
            };
          },
        };

        const { getByTestId } = renderSchoolClass([updateSchoolClassSettingsMock]);

        await waitFor(() => {
          fireEvent.click(getByTestId(/middleSchool-switch/));
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/checkbox/));
        });

        await waitFor(() => {
          fireEvent.click(getByTestId(/save-settings-button/));
        });

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it("updates setting without students' individual settings", async () => {
        const updateSettingsSpy = jest.fn();

        const updateSchoolClassSettingsMock = {
          request: {
            query: updateSchoolClassSettingsMutation,
            variables: {
              input: {
                uuid: '1',
                force: false,
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
                updateSchoolClassSettings: {
                  schoolClass: {
                    settings: {
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                    },
                    students: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: {
                              origin: '',
                              value: '',
                            },
                          },
                          uuid: '',
                        },
                      ],
                    },
                    uuid: '',
                  },
                },
              },
            };
          },
        };

        const { getByTestId } = renderSchoolClass([updateSchoolClassSettingsMock]);

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
  });
});
