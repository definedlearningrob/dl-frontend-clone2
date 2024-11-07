import SharedSwitch from '@shared/components/Switch/Switch';

export default {
  component: SharedSwitch,
  title: 'Switch',
  parameters: {
    componentSubtitle: 'shared switch component',
  },
};

export const Off = () => <SharedSwitch value={false} />;

export const On = () => <SharedSwitch value={true} />;

export const OffDisabled = () => <SharedSwitch disabled={true} value={false} />;

export const OnDisabled = () => <SharedSwitch disabled={true} value={true} />;
