import {
  ActionFunction,
  unstable_parseMultipartFormData,
  UploadHandler,
} from 'remix';
import invariant from 'tiny-invariant';
import { withSupabase } from '~/auth.helpers';
import { authenticator } from '~/auth.server';
import { supabaseAdmin } from '~/supabase.admin.server';

export const uploadFileAction: ActionFunction = async ({ request, params }) => {
  if (!params.appId) {
    return { error: 'No app id supplied.' };
  }

  try {
    const uploadHandler: UploadHandler = async ({ name, stream, filename }) => {
      const session = await authenticator.isAuthenticated(request);

      if (!session) {
        throw 'User must be logged in to upload.';
      }

      const fileWithFolder = `${params.appId}/${filename}`;

      if (name !== 'file') {
        stream.resume();
        return;
      }

      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      try {
        const { data, error } = await supabaseAdmin.storage
          .from('files')
          .upload(fileWithFolder, buffer);

        if (error) {
          throw error;
        }

        return JSON.stringify({ data });
      } catch (err) {
        console.log('ERR', err);

        return;
      }
    };

    const form = await unstable_parseMultipartFormData(request, uploadHandler);

    const file = form.get('file');

    invariant(typeof file === 'string', 'No file retuned');

    const fileInfo = JSON.parse(file);

    return fileInfo;
  } catch (e) {
    return { error: e };
  }
};

export const fileListLoader = withSupabase(
  async ({ supabaseClient, params }) => {
    if (!params.appId) {
      return { error: 'No app id supplied.' };
    }

    const { data, error } = await supabaseClient.storage
      .from('files')
      .list(params.appId);

    return { data, error };
  }
);

export const fileLoader = withSupabase(async ({ supabaseClient, params }) => {
  if (!params.file) {
    return { error: 'No file.' };
  }

  if (!params.appId) {
    return { error: 'No app id supplied.' };
  }

  try {
    const path = `${params.appId}/${params.file}`;

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
});
