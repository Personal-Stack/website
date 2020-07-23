import path from 'path';
import { pageTitleHelper } from './src/helpers/postTitle';
import { Gist, IGistFile } from './src/types/gist';
import { socialLinkEdgesMap } from './src/helpers/map/socialLinkEdges';

const query = `
  query GatsbyNode {
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
    posts: allSanityPost {
      nodes {
        sanityId: id
        urlName
        title
        tag {
          tag
        }
        content
      }
    }
    github {
      viewer {
        gists(first: 100) {
          nodes {
            name
            files {
              name
              text
              language {
                name
              }
            }
            url
          }
        }
      }
    }
  }`;

export const createPages: GatsbyCreatePages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const allCodeSnippetsTemplate = path.resolve(`./src/templates/code-snippets.tsx`);
  const codeSnippetTemplate = path.resolve(`./src/templates/code-snippet.tsx`);
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);

  const { data, errors } = await graphql(query);

  if (errors) {
    throw errors;
  }

  if (data.posts) {
    data.posts.nodes.map((post: any) => {
      const pagePath = `/post/${post.urlName || pageTitleHelper(post.title)}`;
      return createPage({
        path: pagePath,
        component: blogPostTemplate,
        context: {
          socialLinks: data.socialLinks,
          navigationLinks: data.site.siteMetadata.menuLinks,
          pagePath,
          post,
        },
      });
    });
  }

  if (data.github && data.github.viewer) {

    if (data.github.viewer.gists.nodes.length) {
      createPage({
        path: `/code-snippets`,
        component: allCodeSnippetsTemplate,
        context: {
          siteMetadata: data.site.siteMetadata,
          socialLinks: data.socialLinks && data.socialLinks.edges.map(socialLinkEdgesMap),
          navigationLinks: data.site.siteMetadata.menuLinks,
          gists: data.github.viewer.gists.nodes,
        },
      });
    }


    data.github.viewer.gists.nodes.map((el: Gist) =>
      el.files.map((file: IGistFile) => (
        createPage({
          path: `/code-snippet/${file.name}`,
          component: codeSnippetTemplate,
          context: {
            socialLinks: data.socialLinks,
            navigationLinks: data.site.siteMetadata.menuLinks,
            file,
            fileLinkToGithub: el.url,
          },
        })
      )),
    );
  }
};

interface PageInput {
  path: string;
  component: string;
  layout?: string;
  context?: any;
}

interface ActionCreators {
  createPage: (page: PageInput) => void;
  deletePage: (page: PageInput) => void;
  createRedirect: (
    opts: {
      fromPath: string;
      isPermanent?: boolean;
      redirectInBrowser?: boolean;
      toPath: string;
    },
  ) => void;
}

export type GatsbyCreatePages = (
  fns: { graphql: any; actions: ActionCreators },
) => void;
