import { MockedProvider } from '@apollo/client/testing';
import { CourseTypes } from '@graphql/dc/shared/types';
import { screen } from '@testing-library/react';

import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { renderWithRouter } from '@shared/utils/test';

import { Courses, PartnerCourses } from './PartnerCourses';

const studentCourses = [
  {
    id: '881',
    name: 'Biomass Plant Technicians',
    collection: {
      name: 'Career',
    },
    pathway: {
      name: 'Production',
    },
    thumbnailUrl: 'https://picsum.photos/600/300',
    imageUrl: 'https://picsum.photos/600/300',
    description: 'Control and monitor biomass plant activities and perform maintenance as needed.',
    match: 76,
    isEnrolled: false,
    status: 'PUBLISHED',
    type: CourseTypes.HIGH_SCHOOL,
    metadata: {
      alternativeTitles:
        'A Auxiliary, Apprentice Plant Attendant, Assistant Boiler Operator, Auxiliary Engineer, Auxiliary Operator, Auxiliary Plant Operator, B-Operator, B-Operator (Recovery and Combination Boiler Operator), Biomass Boiler Operator, Biomass Facilitator, Biomass Plant Operator, Biomass Plant Technician, Biomass Technician, Boiler Assistant Operator, Boiler Operator, Boiler Plant Operator, Boiler/Chiller Operator, Centrifugal Chiller Technician, Chiller Technician, Circulating Fluidized Bed Boiler/Steam Turbine Operator or Plant Technician/Operator, Cogeneration Operator, Cogeneration Operator (Supervisor), Control Operator, Control Room Operator, Crew Leader/Control Room Operator, Equipment Operat0r, Equipment Operator, Floating Operator, Fuel Handler, Fuel Management Handler, Fuel Operator, Fuel Quality Tech, Fuel Technician, Fuel Yard Operator, Head Operator, Instrumentation and Controls Technician, Journeyman Operator Assistant, Journeyman Power Plant Operator, Journeyman Powerhouse Operator, Operations Plant Attendant, Operations Tech, Plant Attendant, Plant Attendant or Assistant Operator, Plant Operator, Plant Operator Control Room Operator, Plant Operator/Shift Supervisor, Plant Technician, Plant Technician/Control Room Operator, Power and Recovery Boiler Control Room Operator, Power and Recovery Control Room Operator, Power House-Control Room Operator, Power Plant Operator, Senior Boiler Operator, Senior Operator, Thermochemical Biomass Conversion Technician, Woodyard Operator',
      averageSalary: '$58,390',
      jobZone: '2',
      onetCode: '51-8013.03',
      outlook: 'Below Average',
    },
  },
  {
    id: '255',
    name: 'Agricultural Technicians',
    collection: {
      name: 'Career',
    },
    pathway: {
      name: 'Food Products and Processing Systems',
    },
    thumbnailUrl: 'https://picsum.photos/600/300',
    imageUrl: 'https://picsum.photos/600/300',
    description:
      '<p>Work with agricultural scientists in plant, fiber, and animal research, or assist with animal breeding and nutrition. Set up or maintain laboratory equipment and collect samples from crops or animals. Prepare specimens or record data to assist scientists in biology or related life science experiments. Conduct tests and experiments to improve yield and quality of crops or to increase the resistance of plants and animals to disease or insects.</p>',
    match: 69,
    isEnrolled: true,
    status: 'PUBLISHED',
    type: CourseTypes.HIGH_SCHOOL,
    metadata: {
      alternativeTitles:
        'Agricultural Research Technician, Agricultural Research Technologist, Agricultural Technician, Laboratory Technician (Lab Tech), Research Assistant, Research Associate, Research Specialist, Research Technician, Seed Analyst',
      averageSalary: '$41,230',
      jobZone: '3',
      onetCode: '19-4012.00',
      outlook: 'Average',
    },
  },
];

const userCourses = [
  {
    id: '255',
    name: 'Agricultural Technicians',
    collection: {
      name: 'Career',
    },
    pathway: {
      name: 'Food Products and Processing Systems',
    },
    thumbnailUrl: 'https://picsum.photos/600/300',
    imageUrl: 'https://picsum.photos/600/300',
    type: CourseTypes.HIGH_SCHOOL,
    description:
      '<p>Work with agricultural scientists in plant, fiber, and animal research, or assist with animal breeding and nutrition. Set up or maintain laboratory equipment and collect samples from crops or animals. Prepare specimens or record data to assist scientists in biology or related life science experiments. Conduct tests and experiments to improve yield and quality of crops or to increase the resistance of plants and animals to disease or insects.</p>',
    metadata: {
      alternativeTitles:
        'Agricultural Research Technician, Agricultural Research Technologist, Agricultural Technician, Laboratory Technician (Lab Tech), Research Assistant, Research Associate, Research Specialist, Research Technician, Seed Analyst',
    },
  },
  {
    id: '881',
    name: 'Biomass Plant Technicians',
    collection: {
      name: 'Career',
    },
    pathway: {
      name: 'Production',
    },
    thumbnailUrl: 'https://picsum.photos/600/300',
    imageUrl: 'https://picsum.photos/600/300',
    type: CourseTypes.HIGH_SCHOOL,
    description: 'Control and monitor biomass plant activities and perform maintenance as needed.',
    metadata: {
      alternativeTitles:
        'A Auxiliary, Apprentice Plant Attendant, Assistant Boiler Operator, Auxiliary Engineer, Auxiliary Operator, Auxiliary Plant Operator, B-Operator, B-Operator (Recovery and Combination Boiler Operator), Biomass Boiler Operator, Biomass Facilitator, Biomass Plant Operator, Biomass Plant Technician, Biomass Technician, Boiler Assistant Operator, Boiler Operator, Boiler Plant Operator, Boiler/Chiller Operator, Centrifugal Chiller Technician, Chiller Technician, Circulating Fluidized Bed Boiler/Steam Turbine Operator or Plant Technician/Operator, Cogeneration Operator, Cogeneration Operator (Supervisor), Control Operator, Control Room Operator, Crew Leader/Control Room Operator, Equipment Operat0r, Equipment Operator, Floating Operator, Fuel Handler, Fuel Management Handler, Fuel Operator, Fuel Quality Tech, Fuel Technician, Fuel Yard Operator, Head Operator, Instrumentation and Controls Technician, Journeyman Operator Assistant, Journeyman Power Plant Operator, Journeyman Powerhouse Operator, Operations Plant Attendant, Operations Tech, Plant Attendant, Plant Attendant or Assistant Operator, Plant Operator, Plant Operator Control Room Operator, Plant Operator/Shift Supervisor, Plant Technician, Plant Technician/Control Room Operator, Power and Recovery Boiler Control Room Operator, Power and Recovery Control Room Operator, Power House-Control Room Operator, Power Plant Operator, Senior Boiler Operator, Senior Operator, Thermochemical Biomass Conversion Technician, Woodyard Operator',
    },
  },
  {
    id: '1292',
    name: 'Commercial Divers',
    collection: {
      name: 'Career',
    },
    pathway: {
      name: 'Maintenance/Operations',
    },
    thumbnailUrl: 'https://picsum.photos/600/300',
    imageUrl: 'https://picsum.photos/600/300',
    type: CourseTypes.MIDDLE_SCHOOL,
    description:
      '<p>Your goal is to show your understanding of the diving suit system. You will also describe your work as a commercial diver to a friend or family member.</p>',
    metadata: {
      alternativeTitles: '',
    },
  },
];

type Params = {
  userType?: 'student' | 'user';
  courses: Courses;
};

const renderComponent = ({ userType = 'student', courses }: Params) => {
  const userInfo = userType === 'student' ? studentInfoMock : userInfoMock;

  return renderWithRouter(
    <MockedProvider>
      <UserInfoProvider value={{ userInfo: userInfo.result.data.userInfo }}>
        <PartnerCourses courses={courses} />
      </UserInfoProvider>
    </MockedProvider>
  );
};

describe('PartnerCourses', () => {
  it('should render courses for student', async () => {
    const { container } = renderComponent({ courses: studentCourses });

    const courseCards = await screen.findAllByRole('listitem');
    expect(courseCards).toHaveLength(2);
    expect(courseCards[0]).toHaveTextContent('Biomass Plant Technicians');
    expect(courseCards[1]).toHaveTextContent('Agricultural Technicians');

    expect(container).toMatchSnapshot();
  });

  it('should render courses for user', async () => {
    const { container } = renderComponent({ userType: 'user', courses: userCourses });

    const courseCards = await screen.findAllByRole('listitem');
    expect(courseCards).toHaveLength(3);
    expect(courseCards[0]).toHaveTextContent('Agricultural Technicians');
    expect(courseCards[1]).toHaveTextContent('Biomass Plant Technicians');
    expect(courseCards[2]).toHaveTextContent('Commercial Divers');

    expect(container).toMatchSnapshot();
  });
});
