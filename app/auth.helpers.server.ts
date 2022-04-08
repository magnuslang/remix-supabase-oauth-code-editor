import { SupabaseClient, User } from '@supabase/supabase-js';
import { oAuthStrategy } from './auth.server';
import { supabaseClient } from './supabase';

export type VerifySessionResult = {
  supabaseClient: SupabaseClient;
  user: User | null;
};

export const verifySession = async (
  request: globalThis.Request
): Promise<VerifySessionResult> => {
  const oAuthSession = await oAuthStrategy.checkSession(request, {
    failureRedirect: '/login',
  });

  await supabaseClient.auth.setAuth(oAuthSession.access_token);

  const user = (
    await supabaseClient.auth.api.getUser(
      supabaseClient.auth.session()?.access_token || ''
    )
  ).user;

  return { supabaseClient, user };
};
