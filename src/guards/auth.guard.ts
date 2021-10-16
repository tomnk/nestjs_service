import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';
import { UnauthorizedException } from 'src/exceptions/';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization: authHeader } = request.headers;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }
    const token = authHeader.substring(7, authHeader.length);
    return this.authService.isValidToken(token).then((response) => {
      if (response) {
        return true;
      }

      throw new UnauthorizedException();
    });
  }
}
