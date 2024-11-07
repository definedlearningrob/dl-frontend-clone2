import StudentViewSkeletonProgressStep from './Step/Step';

const stepsCount = 4;

function StudentOverallProgressSkeleton() {
  return (
    <div className='skeleton-dashboard-student__progress'>
      {Object.keys([...Array.from({ length: stepsCount })]).map((step) => (
        <StudentViewSkeletonProgressStep key={step} />
      ))}
    </div>
  );
}

export default StudentOverallProgressSkeleton;
