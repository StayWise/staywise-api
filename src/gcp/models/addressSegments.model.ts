import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AddressSegmentsModel {
    @Field(() => String)
    home: string; 
    @Field(() => String)
    postal_code: string; 
    @Field(() => String)
    street: string; 
    @Field(() => String)
    city: string; 
    @Field(() => String)
    country: string; 
    @Field(() => String)
    region: string;
}