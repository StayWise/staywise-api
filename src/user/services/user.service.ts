import { Injectable } from "@nestjs/common";
import { ILoginClientDTO } from "src/auth/dtos/loginClient.dto";
import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository
    ) {}

    async create(doc:IUser) {
        return await this.userRepo.create({ ...doc });
    }

    async getAdmins() {
        return await this.userRepo.getAggregatedAdmins();
    }

    async findByEmail(email:string) {
        return await this.userRepo.findByEmail(email);
    }

    async updateById(_id:string, fields:IUser) {
        return await this.userRepo.updateById(_id, fields);
    }

    async getManagers() {
        return await this.userRepo.getManagers();
    }
}