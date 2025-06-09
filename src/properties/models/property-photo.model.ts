import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PropertyPhoto {
  @Field(() => ID)
  _id: string;
  @Field(() => ID)
  propertyId: string;
  @Field(() => String)
  eTag: string;
  @Field(() => String)
  url: string;
  @Field(() => String)
  key: string;
  @Field(() => String)
  bucket: string;
}
