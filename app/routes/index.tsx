import { Link } from 'remix';

export default function Index() {
  return (
    <>
      <h1>Index page</h1>
      <ul>
        <li>
          <Link to="/private/files">Go to private route</Link>
        </li>
        <li>
          <Link to="/login">Go to login</Link>
        </li>
      </ul>
    </>
  );
}
