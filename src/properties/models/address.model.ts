import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AddressModel {
    @Field(() => String)
    addressLineOne: string; 
    @Field(() => String)
    city: string; 
    @Field(() => String)
    country: string; 
    @Field(() => String)
    description: string; 
    @Field(() => String)
    home: string; 
    @Field(() => String)
    postal_code: string; 
    @Field(() => String)
    region: string; 
    @Field(() => String)
    street: string; 
}