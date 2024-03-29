'use client';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React from 'react';
import SignInButton from '../../components/auth/SignInButton';

const Login = () => {
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn('credentials', { email, password });
      if (result?.error) {
        // Authentication failed
        console.error('Login failed:', result.error);
        // Handle login failure, such as displaying an error message to the user
      }
      // If no error, signIn succeeded, NextAuth will handle the redirect
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, such as displaying an error message to the user
    }
  };

  return (
    <div>
      <section>
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
          <a href="#" className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
            <Image
              className="mr-2 size-8"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
              width={200}
              height={200}
            />
            LootSim
          </a>
          <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => handleSignIn}>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required={true}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="size-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline">
                    Sign up
                  </a>
                </p>
              </form>
              <SignInButton type="Google" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
