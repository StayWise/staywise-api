import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PropertyPhoto {
  @Field(() => ID)
  _id: string;
  @Field(() => ID)
  propertyId: string;
  @Field(() => String)
  publicId: string;
  @Field(() => String)
  url: string;
}
