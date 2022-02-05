export const propertiesAggregation = ({ query = "", images = false } : { query?: string, images?:boolean }) => {
    const pipeline = [];
    
    if (query) {
        pipeline.push({
            $search: {
                index: "property-search",
                compound: {
                    should: [
                        {
                            text: {
                                query,
                                path: {
                                    wildcard: '*'
                                }
                            }
                        },
                        {
                            autocomplete: {
                                path: "address.description",
                                query,
                            }
                        }
                    ],
                    minimumShouldMatch: 1
                }
            }
        })
    }

    pipeline.push(...[
        {
            $lookup: {
                from: "property-types",
                localField: "typeId",
                foreignField: "_id",
                as: "type",
            }
        },
        {
            $unwind: {
                path: "$type",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $lookup: {
                from: "property-portfolios",
                localField: "portfolioId",
                foreignField: "_id",
                as: "portfolio",
            }
        },
        {
            $unwind: {
                path: "$portfolio",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "managerIds",
                foreignField: "_id",
                as: "managers",
            }
        },
    ]);

    if (images) {
        pipeline.push({
            $lookup: {
                from: "property-photos",
                localField: "_id",
                foreignField: "propertyId",
                as: "images",
            }
        })
    }

    return pipeline; 
}