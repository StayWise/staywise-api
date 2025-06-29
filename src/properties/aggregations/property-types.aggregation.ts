export const propertyTypesAggregation = (query: string) => {
  const pipeline = [];

  if (query) {
    pipeline.push({
      $search: {
        index: "property-types-search",
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
