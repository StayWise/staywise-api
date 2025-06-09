import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class AddressDTO {
  @Field(() => String)
  addressLineOne: string;
  @Field(() => String)
  city: string;
  @Field(() => String)
  country: string;
  @Field(() => String)
  description: string;
  @Field(() => String)
  home: string;
  @Field(() => String)
  postal_code: string;
  @Field(() => String)
  region: string;
  @Field(() => String)
  street: string;
}

@InputType()
export class CreatePropertyDTO {
  @Field(() => String)
  portfolio: string;
  @Field(() => [ID])
  managerIds: string[];
  @Field(() => String)
  type: string;
  @Field(() => AddressDTO)
  address: AddressDTO;
  @Field(() => Number)
  units: number;
}
