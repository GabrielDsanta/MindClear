import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
