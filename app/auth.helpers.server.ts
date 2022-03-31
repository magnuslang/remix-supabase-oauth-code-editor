import { DataFunctionArgs } from '@remix-run/server-runtime';
import { SupabaseClient } from '@supabase/supabase-js';
import { LoaderFunction } from 'remix';
import { oAuthStrategy } from './auth.server';
import { supabaseClient } from './supabase.server';

export type LoaderFunctionWithSupabase = (
  args: DataFunctionArgs & {
    supabaseClient: SupabaseClient;
    userId?: string;
  }
) => ReturnType<LoaderFunction>;

export const withSupabase = (
  fn: LoaderFunctionWithSupabase
): LoaderFunction => {
  return async ({ request, ...args }) => {
    const oAuthSession = await oAuthStrategy.checkSession(request, {
      failureRedirect: '/login',
    });

    supabaseClient.auth.setAuth(oAuthSession.access_token);

    const userId = (
      await supabaseClient.auth.api.getUser(
        supabaseClient.auth.session()?.access_token || ''
      )
    ).user?.id;

    return fn({ request, supabaseClient, userId, ...args });
  };
};
