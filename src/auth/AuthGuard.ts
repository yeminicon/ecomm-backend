// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService, private readonly authService: AuthService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);

//     if (!token) {
//       throw new UnauthorizedException('No token provided');
//     }

//     try {
//       const payload = this.jwtService.verify(token);
//       const user = await this.authService.(payload.sub);

//       if (!user || !user.verified) {
//         throw new UnauthorizedException('Invalid token or user not verified');
//       }

//       request.user = user;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     return true;
//   }

//   private extractTokenFromHeader(request: any): string | null {
//     const authHeader = request.headers.authorization;
//     if (!authHeader) {
//       return null;
//     }

//     const [type, token] = authHeader.split(' ');
//     return type === 'Bearer' && token ? token : null;
//   }
// }
