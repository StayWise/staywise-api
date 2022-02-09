import { Field, ObjectType } from "@nestjs/graphql";
import { PropertyModel } from "./property.model";
import { UserModel } from "src/user/models/user.model";
import { PropertyPortfolioModel } from "./property-portfolio.model";
import { PropertyTypesModel } from "./property-types.model";
import { PropertyPhoto } from "./property-photo.model";

@ObjectType()
class PropertyUnitBedroomDetails {
    @Field(() => Number, { nullable: true, defaultValue: null })
    max: number | null; 
    @Field(() => Number, { nullable: true, defaultValue: null })
    min: number | null; 
}

@ObjectType()
class PropertyUnitBathroomDetails {
    @Field(() => Number, { nullable: true, defaultValue: null })
    max: number | null; 
    @Field(() => Number, { nullable: true, defaultValue: null })
    min: number | null; 
}

@ObjectType()
class PropertyUnitDetails {
    @Field(() => Number, { nullable: true, defaultValue: null })
    available: number | null; 
    @Field(() => PropertyUnitBedroomDetails, { nullable: true })
    bedrooms: PropertyUnitBedroomDetails
    @Field(() => PropertyUnitBathroomDetails, { nullable: true })
    bathrooms: PropertyUnitBathroomDetails
}

@ObjectType()
export class AggregatedPropertyModel extends PropertyModel {
    @Field(() => [ UserModel ])
    managers: UserModel[];
    @Field(() => PropertyPortfolioModel)
    portfolio: PropertyPortfolioModel
    @Field(() => PropertyTypesModel)
    type: PropertyTypesModel
    @Field(() => [ PropertyPhoto ], { nullable: true, defaultValue: [] })
    images?: PropertyPhoto[];
    @Field(() => PropertyUnitDetails, { nullable: true, defaultValue: null })
    unitDetails?: PropertyUnitDetails
}