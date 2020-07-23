import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export function CodeHighlight(props: { language: string; value: string; }) {
  return (
    <SyntaxHighlighter language={props.language}>
      {props.value}
    </SyntaxHighlighter>
  );
}
