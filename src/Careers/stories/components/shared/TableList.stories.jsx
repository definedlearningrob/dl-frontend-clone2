import SharedTableList from '@dc/shared/TableList/TableList';

const items = [
  { name: 'first name', description: 'first desc' },
  { name: 'second name', description: 'second desc' },
  { name: 'third name', description: 'third desc' },
];

export default {
  component: SharedTableList,
  title: 'Table list',
  parameters: {
    componentSubtitle: 'shared table list component',
  },
};

export const Default = () => (
  <SharedTableList>
    <SharedTableList.Head>
      <SharedTableList.Header>name</SharedTableList.Header>
      <SharedTableList.Header>description</SharedTableList.Header>
    </SharedTableList.Head>
    <SharedTableList.Body items={items}>
      {({ item }) => (
        <SharedTableList.Row key={item.name}>
          <SharedTableList.Cell>{item.name}</SharedTableList.Cell>
          <SharedTableList.Cell>{item.description}</SharedTableList.Cell>
        </SharedTableList.Row>
      )}
    </SharedTableList.Body>
  </SharedTableList>
);
