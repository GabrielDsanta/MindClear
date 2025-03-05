import { PrismaService } from '../prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signUp(signUpDto: SignUpDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
}
