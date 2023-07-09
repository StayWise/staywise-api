import { Field, ID, InputType } from '@nestjs/graphql';
import { E164Number } from 'libphonenumber-js/min';

@InputType()
export class NewTenantRequestFormDTO {
  @Field(() => String, { nullable: true, defaultValue: '' })
  additionalInfo: string;
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  address: string;
  @Field(() => ID)
  propertyId: string;
  @Field(() => String)
  propertyAddress: string;
  @Field(() => String)
  phone: E164Number;
  @Field(() => String)
  requiredBy: string;
}
