import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="text-white">Homepage</div>
      <Link href="/login" className="text-white">
        Login
      </Link>
    </main>
  );
}
