import Select, { SingleValue } from 'react-select';

import './RubricsDropdown.sass';

type Props = {
  onChange: (value: SingleValue<{ label: number; value: number }>) => void;
  value: {
    label: number;
    value: number;
  };
};

export const RubricsDropdown = ({ value, onChange }: Props) => {
  const options = [...Array(10).keys()].map((value) => ({ value: value + 1, label: value + 1 }));

  return (
    <div data-testid='rubric-dropdown'>
      <Select
        captureMenuScroll={false}
        className='rubrics-dropdown'
        classNamePrefix='rubrics-dropdown'
        isSearchable={false}
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
