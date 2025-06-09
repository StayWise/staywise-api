import { Field, ID, InputType } from "@nestjs/graphql";
import { EMeetFormStatus } from "../enums/meet-form-status.enum";

@InputType()
export class UpdateTenantRequestDTO {
  @Field(() => String)
  status: EMeetFormStatus;
  @Field(() => ID)
  _id: string;
}
