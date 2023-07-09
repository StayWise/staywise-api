import { Field, ID, InputType } from '@nestjs/graphql';
import { EUnitStatus } from '../enums/unit-status.enum';

@InputType()
export class UpdateUnitDTO {
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
