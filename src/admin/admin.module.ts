import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AuthModule from "src/auth/auth.module";
import config from "src/config";
import { UserModule } from "src/user/user.module";
import AdminResolver from "./admin.resolver";
import { AdminService } from "./services/admin.service";

@Module({
  imports: [
    AuthModule,
    UserModule,
    JwtModule.register({
      secret: config.jwt.jwtSecret,
      signOptions: {
        expiresIn: config.jwt.jwtExpire
      }
    })
  ],
  providers: [AdminResolver, AdminService],
  exports: []
})
export class AdminModule {}
