import { User } from '@supabase/supabase-js';
import { ActionFunction, LoaderFunction, Outlet } from 'remix';
import { json, useLoaderData } from 'remix';
import { definitions } from 'types/supabase';
import { withSupabase } from '~/auth.helpers';
import { authenticator, oAuthStrategy } from '~/auth.server';
import AppsList from '~/components/apps-list';
import TopBar from '~/components/top-bar';

export type Apps = definitions['apps'];

type LoaderData = {
  user: User | null;
  apps: Apps[] | null;
};

async function getApps() {}

async function createApp(name: string) {}

export const loader: LoaderFunction = withSupabase(
  async ({ user, supabaseClient }) => {
    try {
      let { data, error, status } = await supabaseClient
        .from<definitions['apps']>('apps')
        .select('*');

      if (error && status !== 406) {
        throw error;
      }
      return json<LoaderData>({ user, apps: data });
    } catch (error) {
      throw error;
    }
  }
);

export const action: ActionFunction = withSupabase(
  async ({ request, supabaseClient, user }) => {
    const formData = await request.formData();
    const { _action, ...values } = Object.fromEntries(formData);

    console.log(_action, values);

    if (_action === 'logout') {
      await authenticator.logout(request, { redirectTo: '/login' });
      return;
    }

    if (_action === 'create-new-app') {
      const name = formData.get('name')?.toString();

      if (!name) {
        throw 'Need to enter an app name.';
      }

      try {
        const result = await supabaseClient
          .from<definitions['apps']>('apps')
          .insert({ name, user_id: user?.id });
        console.log(result);

        return result;
      } catch (error) {
        console.log(error);

        throw error;
      }
    }
  }
);

export default function Editor() {
  const { user, apps } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col w-screen h-screen">
      <TopBar email={user?.email}></TopBar>
      <nav>
        <AppsList apps={apps}></AppsList>
      </nav>
      <div className="flex flex-row grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
