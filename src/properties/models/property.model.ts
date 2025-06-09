import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AddressModel } from "./address.model";

@ObjectType()
export class PropertyModel {
  @Field(() => ID)
  _id: string;
  @Field(() => ID)
  portfolioId: string;
  @Field(() => ID)
  typeId: string;
  @Field(() => [ID])
  managerIds: string[];
  @Field(() => AddressModel)
  address: AddressModel;
  @Field(() => Number)
  units: number;
}
