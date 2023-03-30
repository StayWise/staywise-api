import { Args,  Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePropertyDTO } from "./dtos/create-property.dto";
import { AggregatedPropertyModel } from "./models/aggregated-property.model";
import { PropertyPortfolioModel } from "./models/property-portfolio.model";
import { PropertyTypesModel } from "./models/property-types.model";
import { PropertiesService } from "./services/properties.service";
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { PropertyGroupedByStateModel } from "./models/properties-grouped-by-state.model";
import { PropertyModel } from "./models/property.model";
import { UpdateUnitDTO } from "./dtos/update-unit.dto";
import { PropertyUnitModel } from "./models/property-unit.model";
import { DeletePhotosDTO } from "./dtos/delete-property.dto";
import { UseGuards } from "@nestjs/common";
import { RootGuard } from "src/auth/guards/root.guard";
import { IProperty } from "./interfaces/properties.interface";
import { PropertyConnection } from "./connections/property.connection";
import { ConnectionArguments } from "src/graphql/Connection";
import { AggregatedPropertyConnection } from "./connections/aggregatedProperty.connection";
import { PropertiesRepository } from "./repositories/properties.repository";

@Resolver(() => PropertyModel)
export class PropertiesResolver {
    constructor(
        private readonly propertiesService: PropertiesService,
        private readonly propertiesRepo: PropertiesRepository
    ) {}

    @UseGuards(RootGuard)
    @Mutation(() => Boolean)
    async createProperty(
        @Args({ name: "files", type: () => [ GraphQLUpload ], nullable: true, }) files: FileUpload[], 
        @Args("input") input : CreatePropertyDTO
    ) : Promise<boolean> {
        await this.propertiesService.create(files, input);
        return true; 
    }

    @UseGuards(RootGuard)
    @Mutation(() => Boolean)
    async addPropertyPhotos(
        @Args({ name: "files", type: () => [ GraphQLUpload ], nullable: true, }) files: FileUpload[],
        @Args("propertyId") propertyId : string 
    ) : Promise<boolean> {
        await this.propertiesService.addPropertyPhotos(files, propertyId);
        return true; 
    }

    @Query(() => [ PropertyModel ])
    async getPropertiesByQuery(@Args("query") query:string) : Promise<PropertyModel[]> {
        return await this.propertiesService.getPropertiesByQuery(query);
    }

    @UseGuards(RootGuard)
    @Mutation(() => Boolean)
    async deletePropertyPhotos(@Args("input") { photoIds, propertyId} : DeletePhotosDTO) : Promise<boolean> {
        await this.propertiesService.deletePropertyPhotos(photoIds, propertyId);
        return true; 
    }

    @Query(() => [ AggregatedPropertyModel ])
    async getAggregatedPropertiesByQuery(@Args("query") query:string) : Promise<AggregatedPropertyModel[]> {
        return await this.propertiesService.getAggregatedPropertiesByQuery(query);
    }

    @Query(() => [ PropertyGroupedByStateModel ])
    async getPropertiesGroupedByState() : Promise<PropertyGroupedByStateModel[]> {
        return await this.propertiesService.getPropertiesGroupedByState();
    }

    @Query(() => AggregatedPropertyModel) 
    async getAggregatedPropertyById(@Args("id") id:string) : Promise<AggregatedPropertyModel> {
        return await this.propertiesService.getAggregatedPropertyById(id);
    }

    @Query(() => [ PropertyModel ])
    async getProperties() : Promise<IProperty[]> {
        return await this.propertiesService.getProperties();
    }

    @Query(() => PropertyConnection)
    async getPropertiesConnection(@Args() args: ConnectionArguments) {
        return this.propertiesService.getPropertiesConnection(args)
    }

    @Query(() => [ AggregatedPropertyModel ])
    async getAggregatedProperties() : Promise<AggregatedPropertyModel[]> {
        return await this.propertiesService.getAggregatedProperties();
    }

    @Query(() => AggregatedPropertyConnection)
    async getAggregatedPropertiesConnection(@Args() args: ConnectionArguments, @Args("query") query:string) {
        const { count, edges } = await this.propertiesRepo.getAggregatedPropertiesByQueryConnection(args, query); 
        return {
            edges: edges.map(e => ({
                node: e
            })),
            page: {
                skip: args.skip || 0,
                limit: args.limit,
                count: count
            }
        }
    }

    @Query(() => [ PropertyPortfolioModel ])
    async getPropertyPortfolios(@Args("query", { nullable: true }) query:string | null) : Promise<PropertyPortfolioModel[]> {
        return await this.propertiesService.getPropertyPortfolios(query || "");
    }

    @UseGuards(RootGuard)
    @Query(() => [ PropertyTypesModel ])
    async getPropertyTypes(@Args("query", { nullable: true }) query:string | null) : Promise<PropertyTypesModel[]> {
        return await this.propertiesService.getPropertyTypes(query || "");
    }

    @UseGuards(RootGuard)
    @Mutation(() => Boolean)
    async updateUnit(@Args("input") input: UpdateUnitDTO) : Promise<boolean> {
        await this.propertiesService.updateUnit(input);
        return true; 
    }

    @UseGuards(RootGuard)
    @Query(() => [ PropertyUnitModel ])
    async getUnits(@Args("propertyId") propertyId: string) : Promise<PropertyUnitModel[]> {
        return await this.propertiesService.getUnits(propertyId);
    }
}