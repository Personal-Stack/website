import React, { Component } from 'react';
import { SocialLink } from '@app/types/social-link';
import { NavigationLink } from '@app/types/navigation-link';
import { Layout } from '@app/components/layout/layout';
import { Helmet } from 'react-helmet';
import { Gist } from '@app/types/gist';
import { CodeSnippet } from '@app/components/code-snippet/code-snippet';
import { CopyAlert } from '@app/components/copy-alert/copy-alert';
import './code-snippets.scss';

interface CodeSnippetsProps {
  gists: Gist[] | null;
  siteMetadata: any;
  navigationLinks: NavigationLink[] | null;
  socialLinks: SocialLink[] | null;
}

interface CodeSnippetsState extends CodeSnippetsProps {
  showAlert?: boolean;
}

export default class CodeSnippetsPage extends Component<
  CodeSnippetsProps,
  CodeSnippetsState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      gists: props.pageContext.gists,
      siteMetadata: props.pageContext.siteMetadata,
      navigationLinks: props.pageContext.navigationLinks,
      socialLinks: props.pageContext.socialLinks,
      showAlert: false,
    };
  }

  public copyWasTriggeredAlert = (disableAutoHide: boolean = false) => {
    this.setState({
      showAlert: true,
    });

    if (!disableAutoHide) {
      setTimeout(() => this.hideAlert(), 2000);
    }
  };

  public hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  public render() {
    return (
      <Layout
        links={this.state.siteMetadata.menuLinks}
        socialLinks={this.state.socialLinks}
      >
        <Helmet>
          <title> BB | Code snippets</title>
        </Helmet>
        <section id="app__snippets" role="list">
          {this.state.gists?.map((el, idx) =>
            el.files.map((file) => (
              <CodeSnippet
                key={idx}
                file={file}
                fileLinkToGithub={el.url}
                alert={this.copyWasTriggeredAlert}
              />
            ))
          )}

          {this.state.showAlert ? (
            <CopyAlert hideAlertFunc={() => this.hideAlert.bind(this)} />
          ) : null}
        </section>
      </Layout>
    );
  }
}
