import { Link } from '@remix-run/react';

type TopBarProps = {
  email?: string;
  appName?: string;
};

const LoginLogoutButton = ({ email }: TopBarProps) => (
  <div className="flex flex-row space-x-4 item">
    {email ? (
      <>
        <div className="flex items-center">User: {email}</div>
        <button className="btn btn-primary">
          <Link to={'/logout'}>Sign out</Link>
        </button>
      </>
    ) : (
      <button className="btn btn-primary">
        <Link to="/login">Sign in</Link>
      </button>
    )}
  </div>
);

export default function TopBar({ email, appName }: TopBarProps) {
  return (
    <div className="w-full border-b border-1 border-slate-900 text-base font-medium tracking-tight">
      <div className="flex flex-row w-full justify-between items-center p-2">
        <div className="text-xl ml-4">
          <Link to={'/editor'}>Analysseus</Link>
        </div>
        {appName && <div className="text-lg ml-4">{appName}</div>}
        <LoginLogoutButton email={email}></LoginLogoutButton>
      </div>
    </div>
  );
}
