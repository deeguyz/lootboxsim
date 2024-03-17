import { getServerSession } from 'next-auth';
import SignOutButton from '../../components/auth/SignOutButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Dashboard = async () => {
  const data = await getServerSession(authOptions);
  console.log(data);
  return (
    <div>
      <div className="text-white">{data?.user?.name || 'User'}</div>
      <SignOutButton />
    </div>
  );
};

export default Dashboard;
