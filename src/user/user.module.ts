import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "./repositories/user.repository";
import UserSchema from "./schemas/user.schema";
import { UserService } from "./services/user.service";
import { UserResolver } from "./user.resolver";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'user', schema: UserSchema }
        ]),
    ],
    providers: [ 
        UserRepository, 
        UserService, 
        UserResolver
    ],
    exports: [ UserService ]
})
export class UserModule {};