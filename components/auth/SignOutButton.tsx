'use client';
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const SignOutButton = () => {
  const { data: session } = useSession();
  if (!session) {
    redirect('/');
  }
  return (
    <button className="text-white" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
