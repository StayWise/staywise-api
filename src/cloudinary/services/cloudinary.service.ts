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
   * Upload a file buffer to Cloudinary
   * Used for Express Multer files
   */
  async uploadBuffer(
    buffer: Buffer,
    filename: string,
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
          fetch_format: "auto",
          public_id: `${Date.now()}-${filename}`
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

      uploadStream.end(buffer);
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

  /**
   * Get a signed URL for a private resource (if needed)
   */
  getSignedUrl(publicId: string, expires = 900): string {
    return cloudinary.url(publicId, {
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + expires,
      type: "authenticated"
    });
  }

  /**
   * Transform and optimize image URL
   */
  getOptimizedUrl(
    publicId: string,
    options: {
      width?: number;
      height?: number;
      quality?: string;
      format?: string;
    } = {}
  ): string {
    return cloudinary.url(publicId, {
      quality: options.quality || "auto",
      fetch_format: options.format || "auto",
      width: options.width,
      height: options.height,
      crop: "fill"
    });
  }
}
