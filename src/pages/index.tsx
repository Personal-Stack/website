import React from 'react';
import { socialLinkEdgesMap } from '@app/helpers/map/socialLinkEdges';
import { NavigationLink } from '@app/types/navigation-link';
import { Layout } from '@app/components/layout/layout';
import { Image, Box, Card } from 'theme-ui';
import { Helmet } from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import { Flex } from 'theme-ui';
import './index.scss';

export const query = graphql`
  query SiteQuery {
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
    author: sanityAuthor {
      name
      authorPicture {
        asset {
          url
        }
      }
      presentation: _rawPresentation
    }
  }
`;

export default class IndexPage extends React.Component {
  public render() {
    return (
      <StaticQuery
        query={query}
        render={(data: {
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
          author: {
            name: string;
            authorPicture: {
              asset: {
                url: string;
              };
            };
            presentation: Array<{
              children: Array<{
                text: string;
              }>;
            }>;
          };
        }) => (
          <Layout
            links={data.site.siteMetadata.menuLinks}
            socialLinks={data.socialLinks.edges.map(socialLinkEdgesMap)}
          >
            <Helmet>
              <title>{data.site.siteMetadata.title}</title>
            </Helmet>
            <section id='app__home'>
              <Card role='banner'>
                <Flex aria-label={process.env.GASTBY_SITE_AUTHOR_SHORTNAME + 'presentation'}>
                  <Box p={2} sx={{ flex: '1' }}>
                    <Image
                      role='img'
                      alt='Profile picture'
                      src={data.author.authorPicture.asset.url}
                    />
                  </Box>
                  <Box p={2} sx={{ flex: '1' }}>
                    <section>
                      <h1> {data.author.name} </h1>
                      <p> {data.author.presentation[0]?.children[0]?.text} </p>
                    </section>
                  </Box>
                </Flex>
              </Card>

              <div role='list'>
                {data.site.siteMetadata.menuLinks.map(
                  (link: NavigationLink, index: number) => {
                    if (index === 0 || index > 3) {
                      return;
                    }

                    return (
                      <a key={index} href={link.link} role='listitem'>
                        <Card>
                          <Flex>
                            <Box p={2} sx={{ flex: '1' }}>
                              <Image
                                role='img'
                                alt={link.name + ' link visual representation'}
                                src={
                                  '/images/' +
                                  link.name.toLowerCase().replace(' ', '-') +
                                  '.jpg'
                                }
                              />
                            </Box>
                            <Box p={2} sx={{ flex: '1' }}>
                              <h2> {link.name} </h2>
                            </Box>
                          </Flex>
                        </Card>
                      </a>
                    );
                  },
                )}
              </div>
            </section>
          </Layout>
        )}
      />
    );
  }
}
