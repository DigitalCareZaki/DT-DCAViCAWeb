import type { HTMLProps, ReactElement } from 'react';

interface SpanProps extends HTMLProps<HTMLSpanElement> {
  active?: boolean;
  reversed?: boolean;
}

interface DivProps extends HTMLProps<HTMLDivElement> { }

export type SpanComponent = (props: SpanProps, ref: any) => ReactElement;

export type DivComponent = (props: DivProps, ref: any) => ReactElement;

export interface EditorProps {
  onChange?: (value: any) => void;
  defaultValue?: string;
  extraToolbarContent?: ReactElement | null;
}
