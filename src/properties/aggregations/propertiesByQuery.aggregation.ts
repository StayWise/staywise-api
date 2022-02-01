export const propertiesByQueryAggregation = (query:string) => {
    return [
        {
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
        }
    ]
}
