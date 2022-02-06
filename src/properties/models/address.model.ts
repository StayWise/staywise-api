import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AddressModel {
    @Field(() => String, { nullable: true })
    addressLineOne: string; 
    @Field(() => String, { nullable: true })
    city: string; 
    @Field(() => String, { nullable: true })
    country: string; 
    @Field(() => String)
    description: string; 
    @Field(() => String, { nullable: true })
    home: string; 
    @Field(() => String, { nullable: true })
    postal_code: string; 
    @Field(() => String, { nullable: true })
    region: string; 
    @Field(() => String, { nullable: true })
    street: string; 
}