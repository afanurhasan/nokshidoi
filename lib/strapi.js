export const getStrapiUrl = () => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://mustbuy.srv1073421.hstgr.cloud';
  return url.replace(/\/$/, '');
};

export const getStrapiGraphqlUrl = () => {
  if (process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL) {
    return process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL;
  }
  return `${getStrapiUrl()}/graphql`;
};
