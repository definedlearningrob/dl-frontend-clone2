import UserSchoolClassListStudent from './StudentItemSkeleton';

const usersCount = 18;

function UserSchoolClassList() {
  return (
    <div className='user-class__students__list -placeholder'>
      {Array.from({ length: usersCount }, (_, index) => (
        <UserSchoolClassListStudent key={index} />
      ))}
    </div>
  );
}

export default UserSchoolClassList;
