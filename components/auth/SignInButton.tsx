'use client';
import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

type SignInButtonProps = {
  type: string;
};

const SignInButton = ({ type }: SignInButtonProps) => {
  const { data: session } = useSession();
  if (session && session.user) {
    console.log(session);
    redirect('/dashboard');
  }
  return (
    <button className="text-white" onClick={() => signIn(type.toLowerCase())}>
      Sign In With {type}
    </button>
  );
};

export default SignInButton;
