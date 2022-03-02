import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AddressModel } from "src/properties/models/address.model";
import { PropertyModel } from "src/properties/models/property.model";

@ObjectType()
export class RentalRequestModel {
    @Field(() => ID)
    _id: string; 
    @Field(() => String)
    firstName: string
    @Field(() => AddressModel)
    address: AddressModel
    @Field(() => String)
    lastName: string
    @Field(() => String)
    email: string
    @Field(() => String)
    phone: string
    @Field(() => String, { nullable: true })
    additionalInfo?: string
    @Field(() => Date)
    requiredBy: Date
    @Field(() => Date)
    createdAt: Date
    @Field(() => ID)
    propertyId: Date
    @Field(() => PropertyModel)
    property: PropertyModel;
    @Field(() => String, { nullable: true })
    status?: string; 
}