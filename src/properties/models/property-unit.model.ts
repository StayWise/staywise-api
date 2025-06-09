import { Field, ID, ObjectType } from "@nestjs/graphql";
import { EUnitStatus } from "../enums/unit-status.enum";

@ObjectType()
export class PropertyUnitModel {
  @Field(() => ID)
  _id: string;
  @Field(() => Number)
  unitNumber: number;
  @Field(() => Number, { nullable: true, defaultValue: null })
  bathrooms: number;
  @Field(() => Number, { nullable: true, defaultValue: null })
  bedrooms: number;
  @Field(() => String)
  status: EUnitStatus;
  @Field(() => ID)
  propertyId: string;
}
