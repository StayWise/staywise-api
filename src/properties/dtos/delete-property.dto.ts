import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class DeletePhotosDTO {
    @Field(() => [ String ])
    photoIds: string[]; 
    @Field(() => ID)
    propertyId: string
}