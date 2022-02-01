import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ICreateAdminDTO } from "./dtos/createAdmin.dto";
import { ILoginAdminDTO } from "./dtos/loginAdmin.dto";
import { LoginAdminModel } from "./models/login-admin.model";
import { AdminService } from "./services/admin.service";
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { AdminModel } from "./models/admin.model";
import { IEditAdminDTO } from "./dtos/editAdmin.dto";

@Resolver(() => AdminModel)
export class AdminResolver {
    constructor(
        private readonly adminService: AdminService,
    ){}

    @Mutation(() => LoginAdminModel)
    async loginAdmin(@Args("input") input:ILoginAdminDTO) : Promise<LoginAdminModel> {
        return await this.adminService.loginAdmin(input);
    }   

    @Mutation(() => Boolean, { nullable: true })
    async createAdmin(
        @Args({ name: "file", type: () => GraphQLUpload, nullable: true, }) { createReadStream }: FileUpload, 
        @Args("input") input:ICreateAdminDTO) : Promise<boolean> {
        const stream = createReadStream(); 
        await this.adminService.createAdmin(stream, input);
        return true; 
    }

    @Mutation(() => Boolean)
    async editAdmin(
        @Args("input") input:IEditAdminDTO) : Promise<boolean> {
        await this.adminService.editAdmin(input);
        return true; 
    }

    @Query(() => [ AdminModel ])
    async getAdmins() : Promise<AdminModel[]> {
        return await this.adminService.getAdmins();
    }

    @Query(() => [ AdminModel ])
    async getManagers() : Promise<AdminModel[]> {
        return await this.adminService.getManagers();
    }
}

export default AdminResolver;