import { User } from '@supabase/supabase-js';
import { json, LoaderFunction, Outlet, useLoaderData } from 'remix';
import { definitions } from 'types/supabase';
import { withSupabase } from '~/auth.helpers';
import AppsList from '~/components/app-list';

export type Apps = definitions['apps'];

type LoaderData = {
  user: User | null;
  apps: Apps[] | null;
};

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

export default function Apps() {
  const { apps } = useLoaderData<LoaderData>();

  return (
    <div className="flex w-full h-full">
      <nav className="h-full">
        <AppsList apps={apps}></AppsList>
      </nav>
      <main className="flex flex-row grow">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
