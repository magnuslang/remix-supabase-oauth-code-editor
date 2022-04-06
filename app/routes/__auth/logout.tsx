import { LoaderFunction } from 'remix';
import { authenticator } from '~/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/' });
};
