import { Module } from "@nestjs/common";
import { CloudinaryService } from "./services/cloudinary.service";

@Module({
  imports: [],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
  controllers: []
})
export class CloudinaryModule {}
