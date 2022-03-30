import { ActionFunction, Form, LoaderFunction, Outlet } from 'remix';
import { json, useLoaderData } from 'remix';
import { authenticator, oAuthStrategy } from '~/auth.server';

type TopBarProps = {
  email?: string;
};

function TopBar({ email }: TopBarProps) {
  return (
    <div className="w-full border-b border-1 border-slate-900 text-base font-medium tracking-tight">
      <div className="flex flex-row w-full justify-between items-center p-2">
        <div className="text-xl ml-4">Analysseus</div>

        <div className="flex flex-row space-x-4 item">
          <div className="flex items-center">User: {email}</div>
          <Form method="post">
            <button className="btn btn-primary">Log Out</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

type LoaderData = { email?: string };

export const loader: LoaderFunction = async ({ request }) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: '/login',
  });

  //   console.log(session);

  return json<LoaderData>({ email: session.user?.email });
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};

export default function Private() {
  const { email } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col w-screen h-screen">
      <TopBar email={email}></TopBar>
      <div className="flex flex-row grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
