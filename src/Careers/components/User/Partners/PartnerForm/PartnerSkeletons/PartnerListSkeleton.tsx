import Rectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const PartnerListSkeleton = () => (
  <tr className='border-b border-neutral-300'>
    <td className='p-xs' colSpan={1}>
      <Rectangle color='darker' height='base' radius='sm' size='full-width' />
    </td>
    <td colSpan={2}>
      <Rectangle color='darker' height='base' radius='sm' size='md' />
    </td>
    <td className='p-xs' colSpan={3}>
      <Rectangle color='darker' height='base' radius='sm' size='full-width' />
    </td>
  </tr>
);
