import { Metadata } from 'next';
import { Login } from '@components';

export const metadata: Metadata = {
  title: 'Avica | Login',
  description: 'Avica | Login',
};

export default function Page() {
  return <Login />;
}
