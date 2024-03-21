'use client';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [highlight, setHighlight] = useState<String>('');
  const pathName = usePathname();

  useEffect(() => {
    setHighlight(pathName);
  }, [pathName]);

  const links = [
    {
      id: 1,
      link: '/dashboard',
      title: 'Dashboard',
    },
    {
      id: 2,
      link: '/inventory',
      title: 'Inventory',
    },
  ];

  const highlightText = (link: string) => {
    return highlight === link ? 'text-white' : 'text-gray-500';
  };

  return (
    <div className="sticky mb-10 flex h-20 w-full items-center justify-between bg-black px-4 text-white">
      <div>
        <h1 className="px-4">
          <Link href="/">LootSim</Link>
        </h1>
      </div>
      <ul className="flex">
        <li className="px-4">{session?.user?.name}</li>
        {links.map(({ id, link, title }) => (
          <li className={`cursor-pointer px-4 ${highlightText(link)} text-base hover:text-white`} key={id}>
            <Link href={link}>{title}</Link>
          </li>
        ))}
        {!session ? (
          <li>
            <Link className={`cursor-pointer px-4 ${highlightText('/login')} text-base hover:text-white`} href="/login">
              Login
            </Link>
          </li>
        ) : (
          <li>
            <button
              className="cursor-pointer px-4 text-base text-gray-500 hover:text-white"
              onClick={() => {
                signOut();
                redirect('/');
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
