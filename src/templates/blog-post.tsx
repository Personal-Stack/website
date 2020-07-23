import ReactMarkdown from 'react-markdown';
import React from 'react';
import { socialLinkEdgesMap } from '@app/helpers/map/socialLinkEdges';
import { SocialLink } from '@app/types/social-link';
import { NavigationLink } from '@app/types/navigation-link';
import { Layout } from '@app/components/layout/layout';
import { IPost } from '@app/components/post/post';
import { Helmet } from 'react-helmet';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import { CodeHighlight } from '@app/components/code-highlight/code-highlight';
import { Badge } from 'theme-ui';
import './blog-post.scss';

const BlogPost = (props: {
  pageContext: {
    socialLinks: { edges: Array<{ node: SocialLink }> };
    navigationLinks: NavigationLink[];
    pagePath: string;
    post: IPost;
  };
}) => {
  const disqusConfig = {
    url: `${process.env.GATSBY_SITE_ORIGIN + props.pageContext.pagePath}`,
    identifier: props.pageContext.post.sanityId,
    title: props.pageContext.post.title,
  };

  return (
      <Layout
        links={props.pageContext.navigationLinks}
        socialLinks={props.pageContext.socialLinks.edges.map(socialLinkEdgesMap)}
      >
        <Helmet>
          <title> BB | {props.pageContext.post.title} </title>
        </Helmet>
        <section id='blog__post'>
          <article>
            <h2> {props.pageContext.post.title} </h2>
            <div className='blog__post__tags'>
              {props.pageContext.post.tag.map(
                (tag: { tag: string }, key: number) => (
                  <Badge variant='accent' key={key}>{tag.tag}</Badge>
                ),
              )}
            </div>

            <div className='blog__post__content'>
              <ReactMarkdown
                source={props.pageContext.post.content}
                renderers={{ code: CodeHighlight }}
              />
            </div>

            <CommentCount config={disqusConfig} />
            <Disqus config={disqusConfig} />
          </article>
        </section>
      </Layout>
  );
};

export default BlogPost;
