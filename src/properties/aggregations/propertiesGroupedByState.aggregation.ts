export const propertiesGroupedByStateAggregation = () => {
  return [
    {
      $group: {
        _id: "$address.region",
        cities: {
          $addToSet: "$address.city"
        },
        propertyIds: {
          $addToSet: "$_id"
        }
      }
    },
    {
      $lookup: {
        from: "property-photos",
        let: {
          propertyIds: "$propertyIds"
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$propertyId", "$$propertyIds"]
              }
            }
          },
          {
            $limit: 3
          }
        ],
        as: "images"
      }
    },
    {
      $sort: {
        _id: 1
      } as any
    }
  ];
};
