import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AWSModule } from "src/aws/aws.module";
import { PropertiesResolver } from "./properties.resolver";
import { PropertiesRepository } from "./repositories/properties.repository";
import { PropertiesSchema } from "./schemas/properties.schema";
import { PropertyPhotoSchema } from "./schemas/property-photos.schema";
import { PropertyPortfolioSchema } from "./schemas/property-portfolio.schema";
import { PropertyTypesSchema } from "./schemas/property-types.schema";
import { PropertiesService } from "./services/properties.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "property-portfolios", schema: PropertyPortfolioSchema },
            { name: "property-types", schema: PropertyTypesSchema },
            { name: "properties", schema: PropertiesSchema },
            { name: "property-photos", schema: PropertyPhotoSchema },
        ]),
        AWSModule,
    ],
    providers: [ 
        PropertiesRepository, 
        PropertiesResolver, 
        PropertiesService 
    ],
    exports: [],
})
export class PropertiesModule {};;