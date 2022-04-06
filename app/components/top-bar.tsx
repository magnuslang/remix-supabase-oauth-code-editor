import { ActionFunction, Link } from 'remix';
import { Form, useLoaderData } from 'remix';
import { authenticator } from '~/auth.server';

type TopBarProps = {
  email?: string;
};

const LoginLogoutButton = ({ email }: TopBarProps) => (
  <div className="flex flex-row space-x-4 item">
    {email ? (
      <>
        <div className="flex items-center">User: {email}</div>
        <Form method="post">
          <button
            type="submit"
            name="_action"
            value="logout"
            className="btn btn-primary"
          >
            Sign out
          </button>
        </Form>
      </>
    ) : (
      <button className="btn btn-primary">
        <Link to="/login">Sign in</Link>
      </button>
    )}
  </div>
);

export default function TopBar({ email }: TopBarProps) {
  return (
    <div className="w-full border-b border-1 border-slate-900 text-base font-medium tracking-tight">
      <div className="flex flex-row w-full justify-between items-center p-2">
        <div className="text-xl ml-4">Analysseus</div>
        <LoginLogoutButton email={email}></LoginLogoutButton>
      </div>
    </div>
  );
}
