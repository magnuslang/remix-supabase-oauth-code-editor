import { ActionFunction, LoaderFunction, Outlet } from 'remix';
import { json, useLoaderData } from 'remix';
import { authenticator, oAuthStrategy } from '~/auth.server';

type LoaderData = { email?: string };

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await oAuthStrategy.checkSession(request, {
    failureRedirect: '/login',
  });

  return json<LoaderData>({ email: session.user?.email });
};

export default function Screen() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex">
      Create / Upload a file and click it to start editing.
    </div>
  );
}
