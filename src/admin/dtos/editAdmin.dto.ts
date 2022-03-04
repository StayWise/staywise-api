import { Field, ID, InputType } from "@nestjs/graphql";
import { ERoles } from "src/user/enums/roles.enum";
import { EStatus } from "src/user/enums/status.enum";

@InputType()
export class IEditAdminDTO {
    @Field(() => ID)
    _id: string;
    @Field(() => String)
    firstName: string;
    @Field(() => String)
    lastName: string; 
    @Field(() => String)
    email: string;
    @Field(() => [String])
    roles: ERoles[];
    @Field(() => String, { nullable: true })
    password: string; 
    @Field(() => String)
    status: EStatus;
}