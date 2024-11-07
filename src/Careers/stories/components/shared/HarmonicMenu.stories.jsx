import SharedHarmonicMenu from '@dc/shared/HarmonicMenu/HarmonicMenu';

export default {
  component: SharedHarmonicMenu,
  title: 'Harmonic Menu',
  parameters: {
    componentSubtitle: 'shared harmonic menu component',
  },
};

export const Default = () => (
  <SharedHarmonicMenu items={[{ name: 'first' }, { name: 'second' }, { name: 'third' }]}>
    {({ item }) => (
      <>
        <SharedHarmonicMenu.Header>{item.name}</SharedHarmonicMenu.Header>
        <SharedHarmonicMenu.Content>
          <h1>{item.name}</h1>
        </SharedHarmonicMenu.Content>
      </>
    )}
  </SharedHarmonicMenu>
);
