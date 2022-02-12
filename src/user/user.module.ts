import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
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
        GCPModule,
        SendgridModule,
        PropertiesModule,
    ],
    providers: [ 
        UserRepository, 
        UserService, 
        UserResolver,
    ],
    exports: [ UserService ]
})
export class UserModule {};