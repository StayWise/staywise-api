import { getPropertiesAggregation } from './properties.aggregation';

interface IPropertyAggregationOptions {
  query?: string;
  images?: boolean;
  unitDetails?: boolean;
}

export const propertiesByQueryAggregation = ({
  query = '',
  images = false,
  unitDetails = false,
}: IPropertyAggregationOptions) => {
  const pipeline = [];

  if (query) {
    pipeline.push({
      $search: {
        index: 'property-search',
        compound: {
          should: [
            {
              text: {
                query,
                path: {
                  wildcard: '*',
                },
              },
            },
            {
              autocomplete: {
                path: 'address.description',
                query,
              },
            },
          ],
          minimumShouldMatch: 1,
        },
      },
    });
  }

  pipeline.push(...getPropertiesAggregation({ images, unitDetails }));

  return pipeline;
};
