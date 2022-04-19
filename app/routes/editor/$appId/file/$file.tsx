import { useActionData, useLoaderData } from '@remix-run/react';

import Editor from '@monaco-editor/react';
import { fileLoader } from '~/storage/files';
import { LoaderFunction } from '@remix-run/node';

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
        <div className="flex flex-row h-full w-full">
          <div>
            <Editor
              height="100%"
              width="40vw"
              defaultLanguage="typescript"
              value={file.text}
            />
          </div>
          <div className="grow">
            <iframe src="https://www.dn.se" width="100%" height="100%"></iframe>
          </div>
        </div>
      ) : (
        <div className="p-6">
          Create / Upload a file and click it to start editing.
        </div>
      )}
    </>
  );
}
