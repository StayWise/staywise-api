import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { NewTenantRequestFormDTO } from './dtos/newTenantRequestForm.dto';
import { UpdateTenantRequestDTO } from './dtos/updateTenantRequest.dto';
import { RentalRequestModel } from './models/rentalRequest.model';
import { UserService } from './services/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async createNewTenantRequest(
    @Args('input') input: NewTenantRequestFormDTO,
  ): Promise<boolean> {
    await this.userService.createNewTenantRequest(input);
    return true;
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Boolean)
  async updateTenantRequest(
    @Args('input') input: UpdateTenantRequestDTO,
  ): Promise<boolean> {
    await this.userService.updateTenantRequest(input);
    return true;
  }

  @UseGuards(AdminGuard)
  @Query(() => [RentalRequestModel])
  async getRentalRequests(): Promise<RentalRequestModel[]> {
    return await this.userService.getRentalRequests();
  }
}
