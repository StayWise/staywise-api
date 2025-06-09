import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ILoginAdminDTO {
  @Field(() => String)
  email: string;
  @Field(() => String)
  pass: string;
  @Field(() => Boolean, { defaultValue: false })
  remember: boolean;
}
