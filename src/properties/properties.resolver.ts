import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePropertyDTO } from "./dtos/create-property.dto";
import { AggregatedPropertyModel } from "./models/aggregated-property.model";
import { PropertyPortfolioModel } from "./models/property-portfolio.model";
import { PropertyTypesModel } from "./models/property-types.model";
import { PropertiesService } from "./services/properties.service";
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { PropertyGroupedByStateModel } from "./models/properties-grouped-by-state.model";
import { PropertyModel } from "./models/property.model";

@Resolver()
export class PropertiesResolver {
    constructor(
        private readonly propertiesService: PropertiesService
    ) {}
    
    @Mutation(() => Boolean)
    async createProperty(
        @Args({ name: "files", type: () => [ GraphQLUpload ], nullable: true, }) files: FileUpload[], 
        @Args("input") input : CreatePropertyDTO
    ) : Promise<boolean> {
        await this.propertiesService.create(files, input);
        return true; 
    }

    @Query(() => [ PropertyModel ])
    async getPropertiesByQuery(@Args("query") query:string) : Promise<PropertyModel[]> {
        return await this.propertiesService.getPropertiesByQuery(query);
    }

    @Query(() => [ AggregatedPropertyModel ])
    async getAggregatedPropertiesByQuery(@Args("query") query:string) : Promise<AggregatedPropertyModel[]> {
        return await this.propertiesService.getAggregatedPropertiesByQuery(query);
    }

    @Query(() => [ PropertyGroupedByStateModel ])
    async getPropertiesGroupedByState() : Promise<PropertyGroupedByStateModel[]> {
        return await this.propertiesService.getPropertiesGroupedByState();
    }

    @Query(() => [ AggregatedPropertyModel ])
    async getAggregatedProperties() : Promise<AggregatedPropertyModel[]> {
        return await this.propertiesService.getAggregatedProperties();
    }

    @Query(() => [ PropertyPortfolioModel ])
    async getPropertyPortfolios(@Args("query", { nullable: true }) query:string | null) : Promise<PropertyPortfolioModel[]> {
        return await this.propertiesService.getPropertyPortfolios(query || "");
    }

    @Query(() => [ PropertyTypesModel ])
    async getPropertyTypes(@Args("query", { nullable: true }) query:string | null) : Promise<PropertyTypesModel[]> {
        return await this.propertiesService.getPropertyTypes(query || "");
    }
}