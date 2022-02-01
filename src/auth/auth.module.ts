import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config";
import { UserModule } from "src/user/user.module";
import AuthResolver from "./auth.resolver";
import { AuthService } from "./services/auth.service";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: config.jwt.jwtSecret,
            signOptions: {
              expiresIn: config.jwt.jwtExpire,
            },
        }),
    ],
    providers: [ AuthResolver, AuthService ],
    exports: [ AuthService ],
})
export default class AuthModule {};