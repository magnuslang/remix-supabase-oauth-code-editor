import { Link, LoaderFunction, Outlet } from 'remix';
import { Form, json, useLoaderData } from 'remix';
import { uploadFileAction } from '~/storage/files';
import { supabaseClient } from '~/supabase.server';
import { oAuthStrategy, sessionStorage } from '~/auth.server';
import { SupabaseStrategy } from 'remix-auth-supabase';

export const loader: LoaderFunction = async ({ request }) => {
  const oAuthSession = await oAuthStrategy.checkSession(request, {
    failureRedirect: '/login',
  });

  supabaseClient.auth.setAuth(oAuthSession.access_token);

  const { data, error } = await supabaseClient.storage
    .from('files')
    .list(oAuthSession.user?.id);

  return { data, error };
};

type Files = {
  data: FileObject[] | null;
  error: Error | null;
};

export const action = uploadFileAction;

export default function Files() {
  const files = useLoaderData<Files>();

  return (
    <>
      <nav className="flex flex-col border border-1 justify-between">
        <ul className="text-sm p-3 grow">
          {files.data &&
            files.data.map &&
            files.data.map(({ name }) => (
              <li className="hover:bg-gray-100 p-2" key={name}>
                <Link to={`/private/files/${name}`}>
                  <div className="flex flex-row items-center space-x-3">
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z" />
                      </svg>
                    </span>
                    <span>{name}</span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
        <Form
          method="post"
          encType="multipart/form-data"
          className="p-3 spaxe-y-3"
        >
          <input id="file-input" type="file" name="file" />
          <br />
          <br />
          <button className="btn btn-primary">
            <img src="/icons/upload.png" className="w-5 h-5"></img>
          </button>
        </Form>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
