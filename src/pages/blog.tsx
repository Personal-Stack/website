import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { seriesMapHelper } from '@app/helpers/seriesMap';
import { Post, IPost } from '@app/components/post/post';
import { NavigationLink } from '@app/types/navigation-link';
import { Layout } from '@app/components/layout/layout';
import { socialLinkEdgesMap } from '@app/helpers/map/socialLinkEdges';
import { Helmet } from 'react-helmet';
import { Divider } from 'theme-ui';
import './blog.scss';

export const blogQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
    socialLinks: allSanitySocialLink {
      edges {
        node {
          socialLink
          socialSvg
          socialTitle
        }
      }
    }
    tags: allSanityTag {
      nodes {
        tag
      }
    }
    posts: allSanityPost(sort: { order: DESC, fields: _createdAt }) {
      nodes {
        urlName
        series {
          name
        }
        title
        tag {
          tag
        }
        content
      }
    }
  }
`;

interface CodeSnippetData {
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
  tags: {
    nodes: Array<{ tag: string }>;
  };
  posts: {
    nodes: IPost[];
  };
}

export default class BlogPage extends Component<{}, { searchText: string }> {

  constructor(props: any) {
    super(props);

    this.state = {
      searchText: '',
    };
  }

  public searchPost = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLTextAreaElement;
    const value = target && target.value;

    this.setState({
      searchText: value,
    });
  }

  public render() {
    return (
      <StaticQuery
        query={blogQuery}
        render={(data: CodeSnippetData) => (
          <Layout
            links={data.site.siteMetadata.menuLinks}
            socialLinks={data.socialLinks.edges.map(socialLinkEdgesMap)}
          >
            <Helmet>
              <title> BB | Blog </title>
            </Helmet>
            <section id='app__blog'>

              <ul role='list'>
                {data.posts.nodes.map((post, key) => (
                  <li key={key}>
                    <Post post={post} />
                  </li>
                ))}
              </ul>

              <section role='list' aria-label='Post series'>
                {Object.entries<IPost[]>(seriesMapHelper(data.posts.nodes)).map(
                  ([k, entry], i) => (
                    <section role='listitem' key={i}>
                      <Divider />
                      <h2>{k}</h2>
                      <ul>
                        {entry.map((post: IPost, idx: number) => (
                          <li key={idx}>
                            <Post post={post} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ),
                )}
              </section>
            </section>
          </Layout>
        )}
      />
    );
  }
}
