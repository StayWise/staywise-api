import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class EditPropertyDTO {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  portfolio: string;
  @Field(() => [ID])
  managerIds: string[];
  @Field(() => String)
  type: string;
}
