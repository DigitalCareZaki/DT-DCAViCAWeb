'use server';

import Form from './Form';
import '@init-globals';

export default async function Login(): Promise<JSX.Element> {
  return <Form />;
}
