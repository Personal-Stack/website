import React from 'react';
import { Link } from 'gatsby';
import { IGistFile } from '@app/types/gist';
import { IconButton } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faCopy } from '@fortawesome/free-solid-svg-icons';
import { CodeHighlight } from '@app/components/code-highlight/code-highlight';
import './code-snippet.scss';

// tslint:disable-next-line: no-shadowed-variable
export function CodeSnippet(props: { file: IGistFile; fileLinkToGithub: string, alert: () => void }) {
  const copyToClipboard = (text: string, callback: () => any) => {
    return () => {
      navigator.clipboard.writeText(text);
      callback();
    };
  };

  return (
    <article className='app__code-snippet'>
      <header>
        <h3> {props.file.name} </h3>
        <a href={props.fileLinkToGithub} >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </header>
      <CodeHighlight value={props.file.text} language={props.file.language?.name.toLocaleLowerCase()} />
      <footer>
        <IconButton aria-label='Opens a code snippet preview'>
          <Link
            to={`/code-snippet/${props.file.name}`}
            partiallyActive={true}
            state={{ file: props.file }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </IconButton>
        <IconButton aria-label='Copy code snippet content to clipboard'>
          <FontAwesomeIcon
            icon={faCopy}
            onClick={copyToClipboard(props.file.text, props.alert)}
          />
        </IconButton>
      </footer>
    </article>
  );
}
