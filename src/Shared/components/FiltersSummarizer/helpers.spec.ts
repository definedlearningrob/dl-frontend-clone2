import i18n from '@shared/i18n';

import { getTextContent, splitTemplate } from './helpers';

describe('FiltersSummarizer helpers', () => {
  describe('splitTemplate', () => {
    it('should correctly split a string into replaceable and non-replaceable parts', () => {
      const input = 'This is a **test** string with **replaceable** parts';
      const expectedOutput = [
        { replaceable: false, content: 'This is a ' },
        { replaceable: true, content: 'test' },
        { replaceable: false, content: ' string with ' },
        { replaceable: true, content: 'replaceable' },
        { replaceable: false, content: ' parts' },
      ];

      const result = splitTemplate(input);

      expect(result).toEqual(expectedOutput);
    });
  });

  describe('getTextContent', () => {
    beforeEach(() => {
      i18n.init();
    });

    it('should correctly return text content based on filter value and filter name', () => {
      const params = {
        filterValue: 5,
        filterName: 'studentsTotal',
      };

      const result = getTextContent(params);

      expect(result).toEqual('5 students');
    });

    it('should correctly handle object filter value', () => {
      const params = {
        filterValue: { label: ' 2023/2034  ', value: '2023' },
        filterName: 'schoolYear',
      };

      const result = getTextContent(params);

      expect(result).toEqual('2023/2034');
    });

    it('should correctly handle array filter value with 4 elements', () => {
      const params = {
        filterValue: [
          { label: 'Option1', value: '123' },
          { label: 'Option2', value: '456' },
          { label: 'Option3', value: '567' },
          { label: 'Option4', value: '897' },
        ],
        filterName: 'gradeLevels',
      };

      const result = getTextContent(params);

      expect(result).toEqual('4 grade levels');
    });

    it('should correctly handle array filter value with 1 element', () => {
      const params = {
        filterValue: [{ label: 'Option1', value: '123' }],
        filterName: 'gradeLevels',
      };

      const result = getTextContent(params);

      expect(result).toEqual('1 grade level');
    });

    it('should return "-------" when filterValue object does not have a label property', () => {
      const params = {
        filterValue: null,
        filterName: 'studentsTotal',
      };
      const expectedOutput = '-------';

      const result = getTextContent(params);

      expect(result).toEqual(expectedOutput);
    });
  });
});
