import { User } from '@supabase/supabase-js';
import { Outlet, useLoaderData } from '@remix-run/react';
import { definitions } from 'types/supabase';
import { verifySession } from '~/auth.helpers.server';
import AppsList from '~/components/app-list';
import { json, LoaderFunction } from '@remix-run/node';

export type Apps = definitions['apps'];

type LoaderData = {
  user: User | null;
  apps: Apps[] | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { user, supabaseClient } = await verifySession(request);

  try {
    const { data, error, status } = await supabaseClient
      .from<definitions['apps']>('apps')
      .select('*');

    if (error && status !== 406) {
      throw error;
    }
    return json<LoaderData>({ user, apps: data });
  } catch (error) {
    throw error;
  }
};

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
