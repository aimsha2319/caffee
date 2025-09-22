import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from '../components/providers';

export const metadata: Metadata = {
  title: '<APP_NAME> — Food-first reviews',
  description: 'Modern, trustworthy food reviews for restaurants and cafés.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900">
        <Providers>
          <div className="flex min-h-screen">
            <aside className="hidden w-72 border-r border-stone-200 bg-white p-6 md:flex md:flex-col">
              <h1 className="text-2xl font-bold text-primary">&lt;APP_NAME&gt;</h1>
              <p className="mt-2 text-sm text-stone-500">Curated intel on where to eat and sip.</p>
              <nav className="mt-8 space-y-4 text-sm font-medium">
                <a className="block rounded-lg px-3 py-2 hover:bg-stone-100" href="/home">
                  Home Feed
                </a>
                <a className="block rounded-lg px-3 py-2 hover:bg-stone-100" href="/search">
                  Search &amp; Map
                </a>
                <a className="block rounded-lg px-3 py-2 hover:bg-stone-100" href="/compose">
                  Create Review
                </a>
                <a className="block rounded-lg px-3 py-2 hover:bg-stone-100" href="/lists">
                  Lists
                </a>
                <a className="block rounded-lg px-3 py-2 hover:bg-stone-100" href="/owner">
                  Owner Console
                </a>
                <a className="block rounded-lg px-3 py-2 hover:bg-stone-100" href="/admin">
                  Admin &amp; Moderation
                </a>
              </nav>
            </aside>
            <main className="flex-1 overflow-y-auto p-4 md:p-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
