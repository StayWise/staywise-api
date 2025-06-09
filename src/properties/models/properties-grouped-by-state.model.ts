import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PropertyPhoto } from "./property-photo.model";

@ObjectType()
export class PropertyGroupedByStateModel {
  @Field(() => ID)
  _id: string;
  @Field(() => [String])
  cities: string[];
  @Field(() => [ID])
  propertyIds: string[];
  @Field(() => [PropertyPhoto])
  images: PropertyPhoto[];
}
