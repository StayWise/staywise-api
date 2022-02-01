import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ICreateAdminDTO {
    @Field(() => String)
    firstName: string;
    @Field(() => String)
    lastName: string; 
    @Field(() => String)
    email: string;
    @Field(() => String)
    role: string;
    @Field(() => String)
    temporaryPassword: string; 
}