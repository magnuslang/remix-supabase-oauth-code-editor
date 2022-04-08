import { Link } from '@remix-run/react';
import { Apps } from '~/routes/editor/index';

type AppsListAttrs = { apps: Apps[] | null };

export default function AppsList({ apps }: AppsListAttrs) {
  return (
    <div className="flex w-full h-full align-middle justify-center ">
      <div className="flex flex-col border border-1 w-64">
        <div className="p-3 relative">
          <div className="text-lg text-center">Projects</div>
          <Link to="/editor/app/new">
            <button className="btn btn-primary absolute top-2 right-2">
              +
            </button>
          </Link>
        </div>
        <ul className="text-sm p-3">
          {apps &&
            apps.map(({ name, app_id }) => (
              <li className="hover:bg-gray-100 p-2" key={app_id}>
                <Link to={`/editor/${app_id}`} reloadDocument>
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
      </div>
    </div>
  );
}
