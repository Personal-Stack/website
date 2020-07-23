import { config } from 'dotenv';
config({
  path: `.env.${process.env.NODE_ENV}`,
});

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      GITHUB_TOKEN: string;
      GITHUB_USER: string;
      SANITY_PROJECT_ID: string;
      SANITY_DATASET: string;
      SANITY_TOKEN: string;
      GOOGLE_ANALYTICS_ID: string;
      GATSBY_SITE_ORIGIN: string;
      GATSBY_SITE_DISQUS_SHORTNAME: string;
      GASTBY_SITE_AUTHOR_NAME: string;
      GASTBY_SITE_AUTHOR_SHORTNAME: string;
      GATSBY_SITE_DESCRIPTION: string;
      GATSBY_SITE_KEYWORDS: string;
      GITHUB_AUTH_TOKEN: string;
    }
  }
}

export default {
  siteMetadata: {
    title: 'Bogdan Bogdanov',
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Blog',
        link: '/blog',
      },
      {
        name: 'Code snippets',
        link: '/code-snippets',
      },
      // {
      //   name: 'Portfolio',
      //   link: '/portfolio'
      // },
      // {
      //   name: 'About me',
      //   link: '/about-me'
      // },
    ],
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tsconfig-paths`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.GATSBY_SITE_DISQUS_SHORTNAME,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: 'default',
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Avoids sending page view hits from custom paths
        exclude: ['/preview/**', '/do-not-track/me/too/'],

        forceSSL: true,
      },
    },
  ],
};
