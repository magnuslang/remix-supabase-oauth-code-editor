import type { LinksFunction, LoaderFunction } from 'remix';
import { json, useLoaderData } from 'remix';
import { authenticator, oAuthStrategy, sessionStorage } from '~/auth.server';
import { signInWithGoogle } from '~/supabase.client';
import styles from '~/styles/signin.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto',
    },
    { rel: 'stylesheet', href: styles },
  ];
};

export type LoaderData = {
  error: { message: string } | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  await oAuthStrategy.checkSession(request, {
    successRedirect: '/private/files',
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
      {error && <div>{error.message}</div>}

      <div className="flex flex-col w-screen h-screen items-center pt-10">
        <div>Welcome to</div>
        <div className="text-3xl m-6">Analysseus</div>
        <div>Sign in with:</div>
        <button
          id="googleBtn"
          className="m-6"
          onClick={() => signInWithGoogle()}
        >
          <span className="google-icon"></span>
          <span className="google-buttonText">Google</span>
        </button>
      </div>
    </>
  );
}
