import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import config from "src/config";
import { GCPModule } from "src/gcp/gcp.module";
import { PropertiesModule } from "src/properties/properties.module";
import { SendgridModule } from "src/sendgrid/sendgrid.module";
import { UserRepository } from "./repositories/user.repository";
import { TenantRequestSchema } from "./schemas/tenantRequest.schema";
import UserSchema from "./schemas/user.schema";
import { UserService } from "./services/user.service";
import { UserResolver } from "./user.resolver";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'user', schema: UserSchema },
            { name: 'tenant-requests', schema: TenantRequestSchema }
        ]),
        JwtModule.register({
            secret: config.jwt.jwtSecret,
            signOptions: {
              expiresIn: config.jwt.jwtExpire,
            },
        }),
        GCPModule,
        SendgridModule,
        PropertiesModule,
    ],
    providers: [ 
        UserRepository, 
        UserService, 
        UserResolver,
    ],
    exports: [ UserService, UserRepository ]
})
export class UserModule {};