import { Link } from 'remix';
import TopBar from '~/components/top-bar';

export default function Index() {
  return (
    <>
      <nav className="space-y-6 space-x-6">
        <TopBar></TopBar>
      </nav>
      <main>
        <div>
          <h1>Welcome to Analysseus</h1>
          This is an awesome tool, but login might happen directly from our site
          with the fancy layout.
        </div>
      </main>
    </>
  );
}
