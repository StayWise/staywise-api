import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import config from '../../config';
const AWS = require('aws-sdk');
const stream = require('stream');

AWS.config.update({ region: config?.aws?.s3?.region });
const s3 = new AWS.S3({
  apiVersion: config?.aws?.s3?.apiVersion,
  accessKeyId: config?.aws?.default?.accessKeyId,
  secretAccessKey: config?.aws?.default?.secretAccessKey,
});

@Injectable()
export class S3Service {
  constructor() {}

  async getSignedObjectURL({ key, bucket, expires = 900 }) {
    const signedUrl = s3.getSignedUrl('getObject', {
      Key: key,
      Bucket: bucket,
      Expires: expires,
    });

    return signedUrl;
  }

  async uploadPrivateObject(bucketName, file: Express.Multer.File, key = null) {
    const objectKey = `${Date.now().toString()}-${file.originalname}`;
    var params = {
      Bucket: bucketName,
      Key: key ?? objectKey,
      Body: file.buffer,
    };

    const upload = await new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(null);
          return;
        }
        resolve(data);
      });
    });
    return upload;
  }

  public uploadStreamAsPublicObject(bucketName: string, file: FileUpload) {
    const objectKey = `${Date.now().toString()}-${file.filename}`;

    const pass = new stream.PassThrough();
    var params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: pass,
      ACL: 'public-read',
    };
    return {
      writeStream: pass,
      promise: s3.upload(params).promise(),
    };
  }

  async uploadPublicObject(bucketName, file: Express.Multer.File) {
    const objectKey = `${Date.now().toString()}-${file.originalname}`;

    var params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: file.buffer,
      ACL: 'public-read',
    };

    const upload = await new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(null);
          return;
        }
        resolve(data);
      });
    });

    return upload;
  }

  async deleteObject(bucketName: string, key: string) {
    const params = { Bucket: bucketName, Key: key };
    const deleteRes = await new Promise((resolve, reject) => {
      s3.deleteObject(params, (err, _) => {
        if (err) {
          reject(false);
          return;
        }
        resolve(true);
      });
    });
    return deleteRes;
  }
}
