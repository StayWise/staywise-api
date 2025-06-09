import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AddressesModel {
  @Field(() => String)
  description: string;
  @Field(() => ID)
  place_id: string;
}
