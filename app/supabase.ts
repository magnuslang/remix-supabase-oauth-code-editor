import { createClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';

declare global {
  interface Window {
    env: {
      SUPABASE_URL: string;
      PUBLIC_SUPABASE_ANON_KEY: string;
    };
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_SERVICE_KEY: string;
      PUBLIC_SUPABASE_ANON_KEY: string;
      SESSION_SECRET: string;
    }
  }
}

const browser = typeof document !== 'undefined'; // deno supports 'window', so check document instead

const SUPABASE_URL = browser
  ? window.env.SUPABASE_URL
  : process.env.SUPABASE_URL;
const PUBLIC_SUPABASE_ANON_KEY = browser
  ? window.env.PUBLIC_SUPABASE_ANON_KEY
  : process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) throw new Error('SUPABASE_URL is required');

if (!PUBLIC_SUPABASE_ANON_KEY)
  throw new Error('PUBLIC_SUPABASE_ANON_KEY is required');

export const supabaseClient = createClient(
  SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
  { autoRefreshToken: false, persistSession: false }
);

export const signInWithGoogle = (
  redirectTo = location.origin + '/oauth/callback'
) => {
  supabaseClient.auth.signIn(
    {
      provider: 'google',
    },
    { redirectTo }
  );
};

export { Session };
