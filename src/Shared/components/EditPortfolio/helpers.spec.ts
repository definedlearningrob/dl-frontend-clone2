import { groupBadgesById } from '@shared/components/EditPortfolio/helpers';
import { Badge } from '@shared/resources/types';

describe('EditPortfolio helpers', () => {
  describe('groupBadgesById', () => {
    it('should group badges by id', () => {
      const badges: Badge[] = [
        {
          id: '1',
          name: 'badge1',
          imageUrl: 'image1',
          isHighlighted: false,
          resource: { id: '1', name: 'resource1' },
          description: 'This is description for badge1',
        },
        {
          id: '1',
          name: 'badge1',
          imageUrl: 'image1',
          isHighlighted: false,
          resource: { id: '2', name: 'resource2' },
          description: 'This is description for badge1',
        },
        {
          id: '3',
          name: 'badge3',
          imageUrl: 'image3',
          isHighlighted: false,
          resource: { id: '3', name: 'resource3' },
          description: 'This is description for badge3',
        },
      ];

      const result = groupBadgesById(badges);

      expect(result).toEqual([
        {
          description: 'This is description for badge1',
          id: '1',
          name: 'badge1',
          imageUrl: 'image1',
          isHighlighted: false,
          resources: [
            { id: '1', name: 'resource1' },
            { id: '2', name: 'resource2' },
          ],
        },
        {
          description: 'This is description for badge3',
          id: '3',
          name: 'badge3',
          imageUrl: 'image3',
          isHighlighted: false,
          resources: [{ id: '3', name: 'resource3' }],
        },
      ]);
    });

    it('should return empty array for empty badges', () => {
      const badges = [] as Badge[];

      const result = groupBadgesById(badges);

      expect(result).toEqual([]);
    });
  });
});
