import type { ReactNode } from 'react';
import type { UserProps } from './user';

export type ServerComponent = () => Promise<JSX.Element>;
export type ServerComponentProps<T> = (props: T) => Promise<JSX.Element>;

export type ClientComponent = () => JSX.Element;
export type ClientComponentProps<T> = (props: T) => JSX.Element;

export interface HeaderProps {
  user: UserProps;
}

export interface ChildrenComponentProps {
  children?: ReactNode;
  user?: UserProps;
}

export type PageProps = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export * from './user';
export * from './data';
export * from './vl';
