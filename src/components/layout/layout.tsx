import SocialLinks from '@app/components/social-links/social-links';
import React from 'react';
import OutsideAlert from '@app/components/outside-alert/outside-alert';
import NavigationLinks from '@app/components/navigation-links/navigation-links';
import { SocialLink } from '@app/types/social-link';
import { NavigationLink } from '@app/types/navigation-link';
import { Logo } from '@app/components/logo/logo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconButton, Close } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import './layout.scss';

library.add(fab);

export interface LayoutProps {
  links: NavigationLink[] | null;
  socialLinks: SocialLink[] | null;
}

export interface LayoutState {
  sideNavOpen: boolean;
}

export interface LayoutData {
  site: {
    siteMetadata: { title: string; menuLinks: NavigationLink[] };
  };
  socialLinks: {
    edges: Array<{
      node: {
        socialLink: string;
        socialSvg: string;
        socialTitle: string;
      };
    }>;
  };
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
  public state = {
    sideNavOpen: false,
  };

  constructor(
    public props: {
      children: any;
      links: NavigationLink[];
      socialLinks: SocialLink[] | null;
    },
  ) {
    super(props);
  }

  public toggleSideNav = () => {
    this.setState({
      sideNavOpen: !this.state.sideNavOpen,
    });
  }

  public hideSideNav = () => {
    this.setState({
      sideNavOpen: false,
    });
  }

  public render() {
    return (
      <div id='app'>
        <header>
          <IconButton onClick={this.toggleSideNav} aria-label='Open side navigation' role='navigation'>
            <FontAwesomeIcon icon={faAlignJustify} />
          </IconButton>

          <Logo />

          <NavigationLinks links={this.props.links} />

          <SocialLinks links={this.props.socialLinks || []} />
        </header>

        <OutsideAlert handler={this.hideSideNav}>
          {this.state.sideNavOpen ? (
            <NavigationLinks role='navigation' links={this.props.links}>
              <Close onClick={this.hideSideNav} />
            </NavigationLinks>
          ) : null}
        </OutsideAlert>

        <main>{this.props.children}</main>
        <footer>
          <Logo />

          <SocialLinks links={this.props.socialLinks} />
        </footer>
      </div>
    );
  }
}
