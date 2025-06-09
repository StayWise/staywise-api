import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver
} from "@nestjs/graphql";
import { ICreateAdminDTO } from "./dtos/createAdmin.dto";
import { ILoginAdminDTO } from "./dtos/loginAdmin.dto";
import { LoginAdminModel } from "./models/login-admin.model";
import { AdminService } from "./services/admin.service";
import { AdminModel } from "./models/admin.model";
import { IEditAdminDTO } from "./dtos/editAdmin.dto";
import { UseGuards } from "@nestjs/common";
import { RootGuard } from "src/auth/guards/root.guard";
import config from "src/config";

import momentType from "moment";
import { FileUpload } from "graphql-upload/processRequest.mjs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
const moment: typeof momentType = require("moment");

@Resolver(() => AdminModel)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => LoginAdminModel)
  async loginAdmin(
    @Context() ctx: GraphQLExecutionContext,
    @Args("input") input: ILoginAdminDTO
  ): Promise<LoginAdminModel> {
    const { accessToken, ...user } = await this.adminService.loginAdmin(input);
    const res = (ctx as any).req.res;

    const expires = input.remember
      ? moment().add(config.jwt.jwtExpire, "seconds").toDate()
      : undefined;
    const domain =
      process.env.NODE_ENV === "production"
        ? `.${config.domain}`
        : config.domain;

    res.cookie("access_token", accessToken, {
      expires,
      sameSite: "none",
      httpOnly: true,
      secure: true,
      domain
    });
    res.cookie("has_access", true, {
      secure: true,
      sameSite: "none",
      expires,
      domain
    });

    return user;
  }

  @UseGuards(RootGuard)
  @Mutation(() => Boolean, { nullable: true })
  async createAdmin(
    @Args({ name: "file", type: () => GraphQLUpload, nullable: true })
    { createReadStream }: FileUpload,
    @Args("input") input: ICreateAdminDTO
  ): Promise<boolean> {
    const stream = createReadStream();
    await this.adminService.createAdmin(stream, input);
    return true;
  }

  @UseGuards(RootGuard)
  @Mutation(() => Boolean)
  async editAdmin(@Args("input") input: IEditAdminDTO): Promise<boolean> {
    await this.adminService.editAdmin(input);
    return true;
  }

  @UseGuards(RootGuard)
  @Query(() => [AdminModel])
  async getAdmins(): Promise<AdminModel[]> {
    return await this.adminService.getAdmins();
  }

  @UseGuards(RootGuard)
  @Query(() => [AdminModel])
  async getManagers(): Promise<AdminModel[]> {
    return await this.adminService.getManagers();
  }
}

export default AdminResolver;
