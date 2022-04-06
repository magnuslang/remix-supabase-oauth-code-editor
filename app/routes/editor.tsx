import { User } from '@supabase/supabase-js';
import { LoaderFunction, Outlet } from 'remix';
import { useLoaderData } from 'remix';
import { definitions } from 'types/supabase';
import { withSupabase } from '~/auth.helpers';
import TopBar from '~/components/top-bar';

export const loader: LoaderFunction = withSupabase(
  async ({ user, params, supabaseClient }) => {
    if (params.appId) {
      const { data, error, status } = await supabaseClient
        .from<definitions['apps']>('apps')
        .select('name')
        .eq('app_id', params.appId)
        .maybeSingle();

      return { user, appName: data?.name };
    }

    return { user };
  }
);

export default function Editor() {
  const { user, appName } = useLoaderData<{ user: User; appName?: string }>();

  return (
    <div className="flex flex-col w-screen h-screen">
      <TopBar email={user?.email} appName={appName}></TopBar>
      <div className="flex h-full w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
