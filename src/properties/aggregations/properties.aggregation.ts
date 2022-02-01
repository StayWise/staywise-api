export const propertiesAggregation = () => {
    return [
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
    ]
}