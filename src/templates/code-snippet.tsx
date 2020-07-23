import React, { useState } from 'react';
import { socialLinkEdgesMap } from '@app/helpers/map/socialLinkEdges';
import { SocialLink } from '@app/types/social-link';
import { NavigationLink } from '@app/types/navigation-link';
import { Layout } from '@app/components/layout/layout';
import { IGistFile } from '@app/types/gist';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CodeSnippet } from '@app/components/code-snippet/code-snippet';
import { Button, Alert } from 'theme-ui';
import './code-snippet.scss';

const CodeSnippetPage = (props: {
  pageContext: {
    socialLinks: { edges: Array<{ node: SocialLink }> };
    navigationLinks: NavigationLink[];
    file: IGistFile;
    fileLinkToGithub: string;
  };
}) => {

  const [showAlert, setShowAlert] = useState(false);

  const alertBox = () => {
    return showAlert ? (
      <Alert id='app__code-snippet__alert' variant='accent'>
        <span>
          Copy <FontAwesomeIcon icon={faCheck} />
        </span>
        <Button variant='accent' onClick={() => setShowAlert(false)}>
          OK
        </Button>
      </Alert>
    ) : null;
  };

  return  (
    <Layout
      links={props.pageContext.navigationLinks}
      socialLinks={props.pageContext.socialLinks.edges.map(socialLinkEdgesMap)}
    >
      <Helmet>
        <title> BB | {props.pageContext.file.name}</title>
      </Helmet>
      <section id='app__code-snippet'>
        <CodeSnippet
          file={props.pageContext.file}
          fileLinkToGithub={props.pageContext.fileLinkToGithub}
          alert={() => setShowAlert(true)}
        />

        {alertBox()}
      </section>
    </Layout>
  );
};

export default CodeSnippetPage;
