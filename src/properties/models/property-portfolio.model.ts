import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PropertyPortfolioModel {
    @Field(() => ID)
    _id: string; 
    @Field(() => String)
    name: string; 
}