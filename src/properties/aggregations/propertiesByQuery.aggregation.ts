export const propertiesByQueryAggregation = (query:string) => {
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

    pipeline.push({
        $limit: 75,
    })

    return pipeline; 
}
