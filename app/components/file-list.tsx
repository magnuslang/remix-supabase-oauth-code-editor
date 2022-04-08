import { NavLink, useParams } from '@remix-run/react';
import { Files } from '~/routes/editor/$appId';

export default function FileList({ data }: Files) {
  const params = useParams();

  return (
    <ul className="text-sm p-3">
      {data &&
        data.map &&
        data.map(({ name }) => (
          <li className="hover:bg-gray-100 p-2" key={name}>
            <NavLink
              to={`/editor/${params.appId}/file/${name}`}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <div className="flex flex-row items-center space-x-3">
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z" />
                  </svg>
                </span>
                <span>{name}</span>
              </div>
            </NavLink>
          </li>
        ))}
    </ul>
  );
}
