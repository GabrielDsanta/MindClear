import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
