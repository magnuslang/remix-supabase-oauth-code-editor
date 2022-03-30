import { useEffect } from 'react';
import type { ActionFunction } from 'remix';
import { useSubmit } from 'remix';
import { authenticator } from '~/auth.server';
import { supabaseClient } from '~/supabase.client';

export function mapSession(authSession: any) {
  return {
    accessToken: authSession.access_token,
    refreshToken: authSession.refresh_token ?? '',
    userId: authSession.user?.id ?? '',
    email: authSession.user?.email ?? '',
  };
}

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate('sb-oauth', request, {
    successRedirect: '/private/files',
    failureRedirect: '/login',
  });
};

export default function OAuth() {
  const submit = useSubmit();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          const formData = new FormData();
          formData.append('session', JSON.stringify(session));

          console.log(
            'LOGGED IN! submitting:',
            JSON.stringify(session, null, 2)
          );

          const userSession = mapSession(session!);

          for (const [key, value] of Object.entries(userSession)) {
            formData.append(key, value);
          }

          submit(formData, { method: 'post' });
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [submit]);

  return null;
}
