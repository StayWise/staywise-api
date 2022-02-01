import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { getAdminsAggregation } from "../aggregations/admins.aggregation";
import { ERoles } from "../enums/roles.enum";
import { IUser } from "../interfaces/user.interface";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel("user")
        private readonly userModel : Model<IUser>
    ) {}

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }

    async create({ ...doc }: IUser) {
        return await this.userModel.create({ ...doc });
    }

    async getAggregatedAdmins() {
        return await this.userModel.aggregate(getAdminsAggregation([ 
            ERoles.MANAGER, ERoles.ROOT 
        ]));
    }

    async updateById(_id, fields) {
        return await this.userModel.updateOne({ _id }, { $set: fields });
    }

    async getManagers() {
        return await this.userModel.aggregate(getAdminsAggregation([ ERoles.MANAGER ]));
    }
}   