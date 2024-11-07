import SkeletonAppHeader from '../AppHeader/AppHeader';

function SkeletonContentWrapper() {
  return (
    <main className='min-h-[theme(layout.containerHeight)] md:ml-[theme(variables.navbarExpandWidth)]'>
      <SkeletonAppHeader />
      <div className='mt-[theme(variables.headerHeight)] p-base xxxl:p-md' />
    </main>
  );
}

export default SkeletonContentWrapper;
