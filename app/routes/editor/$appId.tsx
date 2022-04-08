import { Outlet } from '@remix-run/react';
import { Form, useLoaderData } from '@remix-run/react';
import { fileListLoader, uploadFileAction } from '~/storage/files';
import { FileObject } from '@supabase/storage-js';
import FileList from '~/components/file-list';

export const loader = fileListLoader;

export const action = uploadFileAction;

export type Files = {
  data: FileObject[] | null;
  error: Error | null;
};

export default function Files() {
  const { data, error } = useLoaderData<Files>();

  return (
    <>
      <nav className="flex flex-col border border-1 justify-between w-56">
        <FileList data={data} error={error}></FileList>
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
      <main className="flex w-full h-full">
        <Outlet></Outlet>
      </main>
    </>
  );
}
