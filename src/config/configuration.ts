const getCorsDomains = (): string[] => {
  let domains: string[] = [];
  if (process.env.CORS_AVAILABLE_ORIGINS) {
    domains = [...process.env.CORS_AVAILABLE_ORIGINS.split(',')];
  }

  return domains;
};

export default () => ({
  CORS_AVAILABLE_ORIGINS_ARRAY: getCorsDomains(),
});
