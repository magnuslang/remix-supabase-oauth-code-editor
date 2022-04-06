import { Form, Link } from 'remix';

import { Apps } from '../routes/editor';

type AppsListAttrs = { apps: Apps[] | null };

export default function AppsList({ apps }: AppsListAttrs) {
  console.log(apps);

  return (
    <Form method="post">
      <div className="flex w-full h-full align-middle justify-center p-4">
        <div className="flex flex-col border border-1 w-1/2">
          <div className="text-lg text-center">Projects</div>
          <ul className="text-sm p-3">
            {apps &&
              apps.map(({ name, app }) => (
                <li className="hover:bg-gray-100 p-2" key={app}>
                  <Link to={`/editor/${app}`}>
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
          <div className="flex flex-col p-2 border-t space-y-2">
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
              New app
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}
