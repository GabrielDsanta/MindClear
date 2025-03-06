import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        token: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        token: string;
    }>;
}
