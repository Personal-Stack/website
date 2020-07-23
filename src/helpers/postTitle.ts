export const pageTitleHelper = (pageTitle: string) => {
  return pageTitle.split(' ').join('-').toLowerCase();
};
