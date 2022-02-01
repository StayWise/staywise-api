import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ILoginClientDTO } from "../dtos/loginClient.dto";
import * as bcrypt from 'bcryptjs';
import { UserService } from "src/user/services/user.service";
import { SignOptions } from 'jsonwebtoken';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async loginClient({ email, pass }:ILoginClientDTO) {
        const user = await this.userService.findByEmail(email?.toLowerCase()).catch(() => null);
        if (!user || !user.pass) throw new BadRequestException("No Such Account Exists!");
        else if (!(await this.validateUserPassword(pass, user.pass))) throw new ForbiddenException("Access Denied!");
        return user; 
    }

    public async encryptString(input:string) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(input, salt);
    }

    public async generateAccessToken(data, options?: SignOptions) {
        return this.jwtService.sign(data, options);
    }

    private async validateUserPassword(
        password: string,
        hashedPassword: string,
      ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}