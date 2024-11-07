import './Skeleton.sass';

function UserProjectSearchResultsSkeleton() {
  return (
    <div className='skeleton'>
      {Object.keys([...Array(28)]).map((number) => (
        <div key={number} className='skeleton-element'>
          <div className='skeleton-element__image-wrapper' />
          <div className='skeleton-element__placeholder-xs' />
          <div className='skeleton-element__placeholder-md' />
          <div className='skeleton-element__placeholder-lg' />
          <div className='skeleton-element__placeholder-lg' />
          <div className='skeleton-element__placeholder-lg' />
          <div className='skeleton-element__placeholder-sm' />
        </div>
      ))}
    </div>
  );
}

export default UserProjectSearchResultsSkeleton;
