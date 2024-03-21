import Link from 'next/link';
import { getServerSession } from 'next-auth';
import SignOutButton from '../../components/auth/SignOutButton';
import PullItem from '../../components/items/PullItem';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Dashboard = async () => {
  const data = await getServerSession(authOptions);
  return (
    <div className="text-white">
      <div>{data?.user?.name || 'User'}</div>
      <div>
        <Link href="/inventory">Inventory</Link>
      </div>
      <SignOutButton />

      <div className="flex justify-center items-center h-screen">
        <PullItem />
      </div>
    </div>
  );
};

export default Dashboard;
