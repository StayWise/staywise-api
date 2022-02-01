import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "./repositories/user.repository";
import UserSchema from "./schemas/user.schema";
import { UserService } from "./services/user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'user', schema: UserSchema }
        ]),
    ],
    providers: [ UserRepository, UserService ],
    exports: [ UserService ]
})
export class UserModule {};