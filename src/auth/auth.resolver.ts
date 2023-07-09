import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ILoginClientDTO } from './dtos/loginClient.dto';
import { AuthService } from './services/auth.service';

@Resolver(() => {})
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async loginClient(@Args('input') input: ILoginClientDTO): Promise<boolean> {
    await this.authService.loginClient(input);
    return true;
  }
}

export default AuthResolver;
