import SharedDropdown from '@dc/shared/Dropdown/Dropdown';

export default {
  component: SharedDropdown,
  title: 'Dropdown',
  parameters: {
    componentSubtitle: 'shared dropdown component',
  },
};

export const DefaultBottom = () => (
  <SharedDropdown>
    <SharedDropdown.Dropdown>
      <SharedDropdown.Trigger>Click me</SharedDropdown.Trigger>
      <SharedDropdown.Options>
        <SharedDropdown.Option>Edit</SharedDropdown.Option>
        <SharedDropdown.Option>Remove</SharedDropdown.Option>
        <SharedDropdown.Option>Open fire</SharedDropdown.Option>
      </SharedDropdown.Options>
    </SharedDropdown.Dropdown>
  </SharedDropdown>
);

export const Top = () => (
  <SharedDropdown placement='top'>
    <SharedDropdown.Dropdown>
      <SharedDropdown.Trigger>Click me</SharedDropdown.Trigger>
      <SharedDropdown.Options>
        <SharedDropdown.Option>Edit</SharedDropdown.Option>
        <SharedDropdown.Option>Remove</SharedDropdown.Option>
        <SharedDropdown.Option>Open fire</SharedDropdown.Option>
      </SharedDropdown.Options>
    </SharedDropdown.Dropdown>
  </SharedDropdown>
);
