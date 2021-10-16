import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async isValidToken(token: string): Promise<boolean> {
    return !!token;
  }
}
