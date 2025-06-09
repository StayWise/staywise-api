export const getPropertiesAggregation = ({ images, unitDetails }) => {
  let pipeline = [];

  pipeline.push(
    ...[
      {
        $lookup: {
          from: "property-types",
          localField: "typeId",
          foreignField: "_id",
          as: "type"
        }
      },
      {
        $unwind: {
          path: "$type",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "property-portfolios",
          localField: "portfolioId",
          foreignField: "_id",
          as: "portfolio"
        }
      },
      {
        $unwind: {
          path: "$portfolio",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "managerIds",
          foreignField: "_id",
          as: "managers"
        }
      }
    ]
  );

  if (images) {
    pipeline.push({
      $lookup: {
        from: "property-photos",
        localField: "_id",
        foreignField: "propertyId",
        as: "images"
      }
    });
  }

  if (unitDetails) {
    pipeline.push(
      ...[
        {
          $lookup: {
            from: "property-units",
            let: {
              propertyId: "$_id"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$propertyId", "$$propertyId"]
                      },
                      {
                        // '$not': {
                        //     '$in': [
                        //     '$status', [
                        //         'occupied'
                        //     ]
                        //     ]
                        // }
                      }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  maxBedrooms: {
                    $max: "$bedrooms"
                  },
                  minBedrooms: {
                    $min: "$bedrooms"
                  },
                  maxBathrooms: {
                    $max: "$bathrooms"
                  },
                  minBathrooms: {
                    $min: "$bathrooms"
                  }
                }
              },
              {
                $project: {
                  _id: 0
                }
              }
            ],
            as: "unitDetails"
          }
        },
        {
          $unwind: {
            path: "$unitDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "property-units",
            let: {
              propertyId: "$_id"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$propertyId", "$$propertyId"]
                      },
                      {
                        $in: ["$status", ["occupied", "unlisted"]]
                      }
                    ]
                  }
                }
              }
            ],
            as: "unavailbleUnits"
          }
        },
        {
          $addFields: {
            "unitDetails.unavailable": {
              $size: "$unavailbleUnits"
            },
            "unitDetails.bedrooms.max": "$unitDetails.maxBedrooms",
            "unitDetails.bedrooms.min": "$unitDetails.minBedrooms",
            "unitDetails.bathrooms.max": "$unitDetails.maxBathrooms",
            "unitDetails.bathrooms.min": "$unitDetails.minBathrooms"
          }
        },
        {
          $addFields: {
            "unitDetails.available": {
              $subtract: ["$units", "$unitDetails.unavailable"]
            }
          }
        },
        // {
        //     "$match": {
        //         "unitDetails.available": {
        //             $gt: 0
        //         }
        //     }
        // },
        {
          $project: {
            "unitDetails.maxBathrooms": 0,
            "unitDetails.minBathrooms": 0,
            "unitDetails.maxBedrooms": 0,
            "unitDetails.minBedrooms": 0,
            "unitDetails.unavailable": 0,
            unavailbleUnits: 0
          }
        }
      ]
    );
  }

  return pipeline;
};
