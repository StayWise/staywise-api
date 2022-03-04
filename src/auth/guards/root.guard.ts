import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ERoles } from 'src/user/enums/roles.enum';
import { EStatus } from 'src/user/enums/status.enum';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class RootGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const headers = ctx.getContext().req.headers; 
    if (headers.authorization) {
      try {
        const token = headers.authorization.slice(7);
        const data:IUser = this.jwtService.verify(token);
        if (!data) return false; 
        const user:IUser = await this.userRepo.findById(data._id.toString());
        const accountActive = user.status === EStatus.ACTIVE; 
        const hasRequiredRole = user.roles.includes(ERoles.ROOT) 
        if (accountActive && hasRequiredRole) return true; 
        else return false; 
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}