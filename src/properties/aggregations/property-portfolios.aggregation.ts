export const propertyPortfoliosAggregation = (query: string) => {
  const pipeline = [];

  if (query) {
    pipeline.push({
      $search: {
        index: "portfolio-search",
        autocomplete: {
          path: "name",
          query
        }
      }
    });
  }

  pipeline.push({
    $limit: 15
  });

  return pipeline;
};
