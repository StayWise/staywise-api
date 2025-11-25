import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { FileUpload } from "graphql-upload/processRequest.mjs";
import config from "../../config";

cloudinary.config({
  cloud_name: config?.cloudinary?.cloudName,
  api_key: config?.cloudinary?.apiKey,
  api_secret: config?.cloudinary?.apiSecret
});

@Injectable()
export class CloudinaryService {
  constructor() {}

  /**
   * Upload a stream-based file to Cloudinary
   * Used for GraphQL FileUpload types
   */
  async uploadStream(
    file: FileUpload,
    folder = "properties"
  ): Promise<{
    publicId: string;
    url: string;
    secureUrl: string;
    format: string;
  }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "auto",
          quality: "auto",
          fetch_format: "auto"
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
            return;
          }
          resolve({
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
            format: result.format
          });
        }
      );

      file.createReadStream().pipe(uploadStream);
    });
  }

  /**
   * Delete a file from Cloudinary by public ID
   */
  async deleteFile(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === "ok";
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      return false;
    }
  }
}
