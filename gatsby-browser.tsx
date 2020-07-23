import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './src/gatsby-plugin-theme-ui';

export const wrapRootElement = ({ element }: {element: any}) => {
  return (
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  );
};
