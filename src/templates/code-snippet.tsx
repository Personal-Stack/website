import React, { useEffect, useState } from 'react';
import { socialLinkEdgesMap } from '@app/helpers/map/socialLinkEdges';
import { SocialLink } from '@app/types/social-link';
import { NavigationLink } from '@app/types/navigation-link';
import { Layout } from '@app/components/layout/layout';
import { IGistFile } from '@app/types/gist';
import { Helmet } from 'react-helmet';
import { CodeSnippet } from '@app/components/code-snippet/code-snippet';
import { CopyAlert } from '@app/components/copy-alert/copy-alert';
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

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 2000);
    }
  });

  const alertBox = () => {
    return showAlert ? (
      <CopyAlert hideAlertFunc={() => setShowAlert(false)} />
    ) : null;
  };

  return (
    <Layout
      links={props.pageContext.navigationLinks}
      socialLinks={props.pageContext.socialLinks.edges.map(socialLinkEdgesMap)}
    >
      <Helmet>
        <title> BB | {props.pageContext.file.name}</title>
      </Helmet>
      <section id="app__code-snippet">
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
