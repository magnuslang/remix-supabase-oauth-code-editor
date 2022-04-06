import { ActionFunction, Form } from 'remix';
import { definitions } from 'types/supabase';
import { withSupabase } from '~/auth.helpers';

export const action: ActionFunction = withSupabase(
  async ({ request, supabaseClient, user }) => {
    const formData = await request.formData();

    const name = formData.get('name')?.toString();

    if (!name) {
      throw 'Need to enter an app name.';
    }

    try {
      const app = await supabaseClient
        .from<definitions['apps']>('apps')
        .insert({ name, user_id: user?.id });

      return app;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
);

export default function CreateNewApp() {
  return (
    <div className="flex w-full h-full justify-center p-20">
      <Form method="post">
        <div className="flex flex-col space-y-4">
          <div className="text-lg text-center">Create new project</div>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Name
            </span>
            <input type="text" name="name"></input>
          </label>

          <button
            className="btn btn-primary"
            type="submit"
            name="_action"
            value="create-new-app"
          >
            Create new
          </button>
        </div>
      </Form>
    </div>
  );
}
