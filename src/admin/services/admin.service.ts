import { Injectable } from "@nestjs/common";
import { ForbiddenError } from "apollo-server-core";
import { ReadStream } from "fs";
import { AuthService } from "src/auth/services/auth.service";
import { ERoles } from "src/user/enums/roles.enum";
import { IUser } from "src/user/interfaces/user.interface";
import { UserService } from "src/user/services/user.service";
import { ICreateAdminDTO } from "../dtos/createAdmin.dto";
import { IEditAdminDTO } from "../dtos/editAdmin.dto";

@Injectable() 
export class AdminService {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    async loginAdmin({ email, pass }) {
        const user:IUser = await this.authService.loginClient({ email, pass });
        if (!user?.roles?.includes(ERoles.ROOT) && !user.roles.includes(ERoles.MANAGER)) throw new ForbiddenError("Access Denied!");
        const unserializedData = { _id: user?._id, roles: user.roles };
        const accessToken = await this.authService.generateAccessToken(unserializedData, {});
        const { pass:_, ...userObject } = user; 
        return { ...(userObject as any)._doc, accessToken };
    }
    
    async createAdmin(stream: ReadStream, input:ICreateAdminDTO) {
        return await this.userService.create({
            firstName: input.firstName,
            lastName: input.lastName,
            roles: input.roles as ERoles[],
            email: input.email,
            pass: await this.authService.encryptString(input.temporaryPassword),
        });
    }

    async editAdmin({ _id, password, roles, email:_email, ...fields }:IEditAdminDTO) {
        const fieldsPendingUpdate:IUser = { roles, ...fields }; 
        if (password) fieldsPendingUpdate.pass = await this.authService.encryptString(password);
        return await this.userService.updateById(_id, fieldsPendingUpdate);
    }

    async getAdmins() {
        return await this.userService.getAdmins();
    }

    async getManagers() {
        return await this.userService.getManagers();
    }
}