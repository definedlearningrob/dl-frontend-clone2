import { Kicker } from '@shared/components/Kicker';

export default {
  component: Kicker,
  title: 'Kicker',
  parameters: {
    componentSubtitle: 'shared kicker component',
  },
};

export const Default = () => <Kicker>THIS IS A KICKER</Kicker>;
