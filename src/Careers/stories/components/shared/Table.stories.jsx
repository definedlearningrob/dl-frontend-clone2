import SharedTable from '@dc/shared/Table/Table';

export default {
  component: SharedTable,
  title: 'Table',
  parameters: {
    componentSubtitle: 'shared table',
  },
};

// Example Data
var tableData = [
  {
    Service: 'Veterinary Assitance',
    'Cost/Unit': 5445,
    Unit: '1 Hour',
    'Units Requested': 64,
  },
  {
    Service: 'Education',
    'Cost/Unit': 424,
    Unit: '1 Hour',
    'Units Requested': 656,
  },
  {
    Service: 'Public Health',
    'Cost/Unit': 52,
    Unit: '1 Hour',
    'Units Requested': 42,
  },
  {
    Service: 'Public Safety',
    'Cost/Unit': 63,
    Unit: '1 Hour',
    'Units Requested': 342,
  },
  {
    Service: 'Environmental Protection',
    'Cost/Unit': 54,
    Unit: '1 Hour',
    'Units Requested': 33,
  },
  {
    Service: 'Emergency',
    'Cost/Unit': 432,
    Unit: '1 Hour',
    'Units Requested': 423,
  },
  {
    Service: 'Military',
    'Cost/Unit': 50,
    Unit: '1 Hour',
    'Units Requested': 3,
  },
  {
    Service: 'Transportation infrastructure',
    'Cost/Unit': 6546,
    Unit: '1 Hour',
    'Units Requested': 32,
  },
  {
    Service: 'Waste management',
    'Cost/Unit': 543,
    Unit: '1 Hour',
    'Units Requested': 12,
  },
  {
    Service: 'foo',
    Unit: 321,
    'Cost/Unit': 3123,
    'Units Requested': 42,
  },
];

// Configuration of each row cell (callbacks can be pass as args and fire onClick)
const tableConstants = () => [
  {
    title: 'Service',
    render: (itemData) => itemData.Service,
  },
  {
    title: 'Unit',
    render: (itemData) => itemData.Unit,
  },
  {
    title: 'Cost/Unit',
    render: (itemData) => itemData['Cost/Unit'],
  },
  {
    title: 'Units Requested',
    render: (itemData) => itemData['Units Requested'],
  },
];

export const Default = () => (
  <SharedTable>
    <SharedTable.Head cols={tableConstants()} />
    <SharedTable.Body cols={tableConstants()} data={tableData} />
  </SharedTable>
);
