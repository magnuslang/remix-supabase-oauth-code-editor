import {
  ActionFunction,
  unstable_parseMultipartFormData,
  UploadHandler,
} from 'remix';
import invariant from 'tiny-invariant';
import { authenticator, sessionStorage } from '~/auth.server';
import { supabaseAdmin } from '~/supabase.server';

export const uploadFileAction: ActionFunction = async ({ request }) => {
  try {
    const uploadHandler: UploadHandler = async ({ name, stream, filename }) => {
      console.log('in uploadHandler');

      const session = await authenticator.isAuthenticated(request);

      if (!session) {
        throw 'No user found.';
      }

      const fileWithFolder = `${session.user?.id}/${filename}`;

      if (name !== 'file') {
        stream.resume();
        return;
      }

      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      console.log('calling supabase w file');

      try {
        const { data, error } = await supabaseAdmin.storage
          .from('files')
          .upload(fileWithFolder, buffer);

        console.log('result ', data, error);
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
    console.log(typeof file);

    invariant(typeof file === 'string', 'No file retuned');

    const fileInfo = JSON.parse(file);

    return fileInfo;
  } catch (e) {
    return { error: e };
  }
};
