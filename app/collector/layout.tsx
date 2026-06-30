'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Props {
  children: ReactNode;
}

export default function CollectorLayout({ children }: Props) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const menu = [
    { name: 'Dashboard', path: '/collector/dashboard' },
    { name: 'Pengajuan Limbah', path: '/collector/requests' },
    { name: 'Penjemputan', path: '/collector/pickup' },
    { name: 'Laporan', path: '/collector/report' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">

      {/* SIDEBAR */}
      <aside className="w-64 p-6 flex flex-col border-r border-theme bg-white">

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-primary">
            🌿 E-Cycle
          </h2>
          <p className="text-sm text-gray-500">
            E-Waste Management
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          {menu.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${active
                    ? 'bg-primary-light text-primary'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-theme pt-4 mt-6">
          <p className="text-sm text-gray-500 mb-2">
            {user?.email}
          </p>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}