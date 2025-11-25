import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import config from "src/config";
import { UserModule } from "src/user/user.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { PropertiesResolver } from "./properties.resolver";
import { PropertiesRepository } from "./repositories/properties.repository";
import { PropertiesSchema } from "./schemas/properties.schema";
import { PropertyPhotoSchema } from "./schemas/property-photos.schema";
import { PropertyPortfolioSchema } from "./schemas/property-portfolio.schema";
import { PropertyTypesSchema } from "./schemas/property-types.schema";
import { PropertyUnitSchema } from "./schemas/property-unit.schema";
import { PropertiesService } from "./services/properties.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "property-portfolios", schema: PropertyPortfolioSchema },
      { name: "property-types", schema: PropertyTypesSchema },
      { name: "properties", schema: PropertiesSchema },
      { name: "property-photos", schema: PropertyPhotoSchema },
      { name: "property-units", schema: PropertyUnitSchema }
    ]),
    JwtModule.register({
      secret: config.jwt.jwtSecret,
      signOptions: {
        expiresIn: config.jwt.jwtExpire
      }
    }),
    forwardRef(() => UserModule),
    CloudinaryModule
  ],
  providers: [PropertiesRepository, PropertiesResolver, PropertiesService],
  exports: [PropertiesRepository]
})
export class PropertiesModule {}
