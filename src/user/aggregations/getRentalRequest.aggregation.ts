export const getRentalRequestsAggregation = () => {
    return [
        { 
            $match: {},
        }, 
        {
            $lookup: {
                from: "properties",
                localField: "propertyId",
                foreignField: "_id",
                as: "property"
            }
        },
        {
            $unwind: {
                path: "$property",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $sort: {
                createdAt: -1,
            },
        } as any
    ]
}