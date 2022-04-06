import { DataFunctionArgs } from '@remix-run/server-runtime';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { LoaderFunction } from 'remix';
import { oAuthStrategy } from './auth.server';
import { supabaseClient } from './supabase';

export type LoaderFunctionWithSupabase = (
  args: DataFunctionArgs & {
    supabaseClient: SupabaseClient;
    user: User | null;
  }
) => ReturnType<LoaderFunction>;

export const withSupabase = (
  fn: LoaderFunctionWithSupabase
): LoaderFunction => {
  return async ({ request, ...args }) => {
    const oAuthSession = await oAuthStrategy.checkSession(request, {
      failureRedirect: '/login',
    });

    const apa = await supabaseClient.auth.setAuth(oAuthSession.access_token);

    const user = (
      await supabaseClient.auth.api.getUser(
        supabaseClient.auth.session()?.access_token || ''
      )
    ).user;

    return fn({ request, supabaseClient, user, ...args });
  };
};
