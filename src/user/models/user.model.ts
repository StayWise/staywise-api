import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ERoles } from '../enums/roles.enum';
import { EStatus } from '../enums/status.enum';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  _id: string;
  @Field(() => String, { nullable: true })
  firstName: string;
  @Field(() => String, { nullable: true })
  lastName: string;
  @Field(() => [String])
  roles: ERoles[];
  @Field(() => String)
  email: string;
  @Field(() => String, { nullable: true })
  status: EStatus;
}
