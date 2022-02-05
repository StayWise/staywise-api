import { Field, ObjectType } from "@nestjs/graphql";
import { PropertyModel } from "./property.model";
import { UserModel } from "src/user/models/user.model";
import { PropertyPortfolioModel } from "./property-portfolio.model";
import { PropertyTypesModel } from "./property-types.model";
import { PropertyPhoto } from "./property-photo.model";

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
}