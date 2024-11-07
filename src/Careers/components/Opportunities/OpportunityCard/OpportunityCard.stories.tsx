import { ComponentStory } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';

import { OpportunityCard } from './OpportunityCard';

export default {
  component: OpportunityCard,
  title: 'Opportunity Card',
  argTypes: {
    name: { control: 'text' },
    imageUrl: { control: 'text' },
    opportunityType: { control: 'radio', options: Object.values(OpportunityTypes) },
    periodStart: { control: 'date' },
    periodEnd: { control: 'date' },
    deadline: { control: 'date' },
    isFavorite: { control: 'boolean' },
    isRecommended: { control: 'boolean' },
    applicationStatus: {
      control: 'radio',
      options: [undefined, ...Object.values(OPPORTUNITY_APPLICATION_STATUS)],
      labels: {
        undefined: 'No status',
      },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
};

const Template: ComponentStory<typeof OpportunityCard> = (args) => {
  const wrapperWidth = args.orientation === 'horizontal' ? '470px' : '310px';

  return (
    <MockedProvider mocks={[]}>
      <div style={{ maxWidth: wrapperWidth }}>
        <OpportunityCard {...args} />
      </div>
    </MockedProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  imageUrl: 'https://picsum.photos/600/300',
  opportunityType: OpportunityTypes.INTERNSHIP,
  periodStart: '2018-05-03T00:00:00.000Z',
  periodEnd: '2022-10-10T00:00:00.000Z',
  deadline: '2018-05-01T00:00:00.000Z',
  isFavorite: true,
  isRecommended: true,
  orientation: 'vertical',
  pathways: [{ id: '1', name: 'Example pathway' }],
};
