import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PropertyTypesModel {
  @Field(() => ID)
  _id: string;
  @Field(() => String)
  name: string;
}
