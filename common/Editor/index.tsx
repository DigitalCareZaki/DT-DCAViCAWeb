'use client';

import { Text } from 'slate';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import escapeHtml from 'escape-html';
import { jsx } from 'slate-hyperscript';
import { withHistory } from 'slate-history';

import { withLinks } from './plugins';
import { MarkButton, Toolbar } from './components';
import { toggleKeyboardShortcut } from './keyboardShortcuts';
import { Element, Leaf } from './toolbarElements';

import type { ClientComponentProps } from '@types';
import type { EditorProps } from './types';

const SlateEditor: ClientComponentProps<EditorProps> = ({
  onChange,
  defaultValue,
  extraToolbarContent = null,
}) => {
  const [initlized, setInitlized] = useState<number>(0);
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  );

  // Keep track of state for the value of the editor.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: ' ' }],
    },
  ]);

  const serializeValue = (node: any) => {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text);
      // @ts-ignore
      if (node.bold) {
        string = `<strong>${string}</strong>`;
      }
      return string;
    }

    let children = [];

    if (node?.children?.length) {
      children = node?.children?.map((n: any) => serializeValue(n)).join('');
    }

    if (node?.length) {
      children = node?.map((n: any) => serializeValue(n)).join('');
    }

    switch (node.type) {
      case 'quote':
        return `<blockquote><p>${children}</p></blockquote>`;
      case 'paragraph':
        return `<p>${children}</p>`;
      case 'link':
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      default:
        return children;
    }
  };

  const deserialize = (el: any, markAttributes = {}): any => {
    if (el.nodeType === Node.TEXT_NODE) {
      return jsx('text', markAttributes, el.textContent);
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const nodeAttributes = { ...markAttributes };

    // define attributes for text nodes
    switch (el.nodeName) {
      case 'STRONG':
        // @ts-ignore
        nodeAttributes.bold = true;
    }

    const children = Array.from(el.childNodes)
      .map((node) => deserialize(node, nodeAttributes))
      .flat();

    if (children.length === 0) {
      children.push(jsx('text', nodeAttributes, ''));
    }

    switch (el.nodeName) {
      case 'BODY':
        return jsx('fragment', {}, children);
      case 'BR':
        return '\n';
      case 'BLOCKQUOTE':
        return jsx('element', { type: 'quote' }, children);
      case 'P':
        return jsx('element', { type: 'paragraph' }, children);
      case 'A':
        return jsx(
          'element',
          { type: 'link', url: el.getAttribute('href') },
          children
        );
      default:
        return children;
    }
  };

  useEffect(() => {
    if (!defaultValue?.length) {
      setInitlized((prev) => prev + 1);
      return;
    }

    const document = new DOMParser().parseFromString(defaultValue, 'text/html');
    const parseValue = deserialize(document.body);
    if (!parseValue) {
      setInitlized((prev) => prev + 1);
      return;
    }
    setValue([...parseValue]);
    setInitlized((prev) => prev + 1);
  }, [defaultValue]);

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const handleChange = (value: any) => {
    setValue(value);

    const serialize = serializeValue(value);
    onChange?.call(this, serialize);
  };

  return (
    <div key={initlized}>
      <Slate
        editor={editor as any as ReactEditor}
        initialValue={value}
        onChange={handleChange}
      >
        <div className="border-[#ccc]">
          <Toolbar>
            <MarkButton format="bold" icon="FaBold" />
            <MarkButton format="italic" icon="FaItalic" />
            <MarkButton format="underline" icon="FaUnderline" />
            <MarkButton format="code" icon="FaCode" />

            {/* <LinkButton /> */}
            {extraToolbarContent}
          </Toolbar>
          <Editable
            className="min-h-[400px] rounded-lg bg-gray-100 px-[16px] py-2 outline-none"
            onKeyDown={(event) => {
              toggleKeyboardShortcut(event, editor as any);
            }}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </div>
      </Slate>
    </div>
  );
};

export default SlateEditor;
