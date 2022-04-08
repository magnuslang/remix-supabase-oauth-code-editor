import { Link } from '@remix-run/react';
import TopBar from '~/components/top-bar';

export default function Index() {
  return (
    <>
      <nav className="space-y-6 space-x-6">
        <TopBar></TopBar>
      </nav>
      <main>
        <div className="flex flex-col  w-full items-center">
          <div className="p-6 space-y-6 max-w-xl">
            <div className="text-center text-lg">Welcome to Analysseus</div>
            <div className="text-center">
              Simply and swiftly create interactive graphs and dashboards from
              your data. Share as an app instantly. Free. No account required,
              just sign in to keed your data safe.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
