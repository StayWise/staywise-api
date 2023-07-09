import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import config from './config';
import AuthModule from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { graphqlUploadExpress } from 'graphql-upload';
import { AWSModule } from './aws/aws.module';
import { GCPModule } from './gcp/gcp.module';
import { PropertiesModule } from './properties/properties.module';
import { SendgridModule } from './sendgrid/sendgrid.module';

const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        cors: {
          origin: config?.origin?.whitelist,
          credentials: true,
        },
        debug: isDevelopment,
        playground: isDevelopment,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
      }),
    }),
    JwtModule.register({
      secret: config.jwt.jwtSecret,
      signOptions: {
        expiresIn: config.jwt.jwtExpire,
      },
    }),
    MongooseModule.forRoot(config.mongodb.uri, config.mongodb.options),
    AuthModule,
    UserModule,
    AdminModule,
    AWSModule,
    GCPModule,
    PropertiesModule,
    SendgridModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
