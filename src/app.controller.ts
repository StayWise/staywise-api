import { Controller, Get } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver(() => {})
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Query(() => String)
  getRoot(): string {
    return this.appService.getRoot();
  }
}
