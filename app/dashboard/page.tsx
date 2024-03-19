import { getServerSession } from 'next-auth';
import SignOutButton from '../../components/auth/SignOutButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PullItem from '../../components/items/PullItem';

const Dashboard = async () => {
  const data = await getServerSession(authOptions);
  console.log(data);
  return (
    <div>
      <div className="text-black">{data?.user?.name || 'User'}</div>
      <SignOutButton />

      <div className="flex justify-center items-center h-screen">
        <PullItem />
      </div>
    </div>
  );
};

export default Dashboard;
