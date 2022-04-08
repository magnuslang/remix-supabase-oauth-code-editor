import { User } from '@supabase/supabase-js';
import { Outlet } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import TopBar from '~/components/top-bar';
import { definitions } from 'types/supabase';
import { LoaderFunction } from '@remix-run/node';
import { verifySession } from '~/auth.helpers.server';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, supabaseClient } = await verifySession(request);

  if (params.appId) {
    const { data, error, status } = await supabaseClient
      .from<definitions['apps']>('apps')
      .select('name')
      .eq('app_id', params.appId)
      .maybeSingle();

    return { user, appName: data?.name };
  }

  return { user };
};

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
