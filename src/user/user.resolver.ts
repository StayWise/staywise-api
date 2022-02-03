import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { NewTenantRequestFormDTO } from "./dtos/newTenantRequestForm.dto";
import { UserService } from "./services/user.service";

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

    @Mutation(() => Boolean)
    async createNewTenantRequest(@Args("input") input : NewTenantRequestFormDTO) : Promise<boolean> {
        await this.userService.createNewTenantRequest(input);
        return true; 
    }
}