import { Field, ObjectType } from "@nestjs/graphql";
import { UserModel } from "src/user/models/user.model";

@ObjectType()
export class LoginAdminModel extends UserModel {}
