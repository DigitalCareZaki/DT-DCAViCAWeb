'use client';

import { forwardRef, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { useSlate } from 'slate-react';
import { twMerge } from 'tailwind-merge';
import { Icon as IconBasic } from '@common';

import {
  isBlockActive,
  toggleBlock,
  isMarkActive,
  toggleMark,
  isLinkActive,
  insertLink,
} from './helpers';

import type { SpanComponent, DivComponent } from './types';
import type { icon } from '../../common/types';

const ButtonComponent: SpanComponent = (
  { className, active, reversed, ...props },
  ref
) => (
  <span
    {...props}
    ref={ref}
    className={twMerge(
      'cursor-pointer transition-colors duration-200',
      active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-200',
      className
    )}
  />
);

export const Button = forwardRef(ButtonComponent);

const IconComponent: SpanComponent = ({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={twMerge(
      'h-10 w-10 rounded-lg bg-black',
      className,
      'align-text-bottom text-[18px]'
    )}
  />
);

export const Icon = forwardRef(IconComponent);

export const MenuComponent: DivComponent = ({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={twMerge('flex items-center gap-2', className)}
  />
);

export const Menu = forwardRef(MenuComponent);

export const Portal = ({ children }: { children?: ReactElement }) => {
  return createPortal(children, document.body);
};

const ToolbarComponent: DivComponent = ({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={twMerge(
      'relative mb-[20px] border-b-2 border-[#eee] p-[10px]',
      className
    )}
  />
);

export const Toolbar = forwardRef(ToolbarComponent);

export const BlockButton = ({ format, icon }: { format: any; icon: icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    // className="h-fit w-fit rounded-lg bg-gray-100 p-2 transition duration-300 hover:bg-gray-200"
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export const MarkButton = ({ format, icon }: { format: any; icon: icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      className="flex h-8 w-8 items-center justify-center rounded-md"
    >
      <IconBasic name={icon} size={16} />
    </Button>
  );
};

export const LinkButton = () => {
  const editor = useSlate();
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
      className="flex h-8 w-8 items-center justify-center rounded-md"
    >
      <IconBasic name="FaLink" size={16} />
    </Button>
  );
};
