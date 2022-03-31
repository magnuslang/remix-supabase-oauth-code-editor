import { LoaderFunction, useActionData, useLoaderData } from 'remix';
import { supabaseClient } from '~/supabase.server';

import Editor from '@monaco-editor/react';
import { oAuthStrategy } from '~/auth.server';
import { fileLoader } from '~/storage/files';

type FileState = {
  text?: string;
  error: Error | null;
};

export const loader: LoaderFunction = fileLoader;

export default function File() {
  const file = useLoaderData<FileState>();

  if (file.error) {
    console.log(file.error);
  }

  return (
    <>
      {file.text ? (
        <Editor
          height="90vh"
          width="90vw"
          defaultLanguage="typescript"
          value={file.text}
        />
      ) : (
        <div className="p-6">
          Create / Upload a file and click it to start editing.
        </div>
      )}
    </>
  );
}
