import { LoaderFunction, useLoaderData } from 'remix';
import { supabaseClient } from '~/supabase.server';

import Editor from '@monaco-editor/react';
import { oAuthStrategy } from '~/auth.server';

type FileState = {
  text?: string;
  error: Error | null;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.file) {
    return { error: 'No file.' };
  }

  const oAuthSession = await oAuthStrategy.checkSession(request, {
    failureRedirect: '/login',
  });

  supabaseClient.auth.setAuth(oAuthSession.access_token);

  try {
    const path = oAuthSession.user?.id + '/' + params.file;
    console.log(path);

    const { data, error } = await supabaseClient.storage
      .from('files')
      .download(path);

    if (error) {
      throw error;
    }

    return { text: await data?.text(), error };
  } catch (err) {
    console.log(err);

    throw 'Could not display file.';
  }
};

export default function File() {
  const file = useLoaderData<FileState>();

  if (file.error) {
    console.log(file.error);
  }
  console.log(file.text);

  return (
    <>
      <Editor
        height="90vh"
        width="90vw"
        defaultLanguage="typescript"
        value={file.text}
      />
    </>
  );
}
