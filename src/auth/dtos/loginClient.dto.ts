import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ILoginClientDTO {
  @Field(() => String)
  email: string;
  @Field(() => String)
  pass: string;
}
