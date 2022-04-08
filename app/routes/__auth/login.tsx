import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { authenticator, oAuthStrategy, sessionStorage } from '~/auth.server';
import { signInWithGoogle } from '~/supabase';
import styles from '~/styles/signin.css';
import { useLoaderData } from '@remix-run/react';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto:500',
    },
    { rel: 'stylesheet', href: styles },
  ];
};

export type LoaderData = {
  error: { message: string } | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  await oAuthStrategy.checkSession(request, {
    successRedirect: '/editor',
  });

  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const error = session.get(
    authenticator.sessionErrorKey
  ) as LoaderData['error'];

  return json<LoaderData>({ error });
};

export default function Login() {
  const { error } = useLoaderData<LoaderData>();

  return (
    <>
      {/* {error && <div>{error.message}</div>} */}

      <div className="flex flex-col w-screen h-screen items-center pt-10">
        <div>Welcome to</div>
        <div className="text-3xl m-6">Analysseus</div>
        <div>Sign in:</div>
        <div className="google-btn m-6" onClick={() => signInWithGoogle()}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <span className="google-btn-text">Sign in with Google</span>
        </div>
      </div>
    </>
  );
}
