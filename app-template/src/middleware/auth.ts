import passport from 'passport';
import { UserRole, UserCredential } from '../model/credentials';
import { Request, Response, NextFunction } from 'express';
import { errorResponseMessage } from '../Constants/Constants';
import { NetResponse } from '../Constants/Constants';

export function authenticate() {
  return passport.authenticate('jwt', { session: false });
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      throw errorResponseMessage(NetResponse.UN_AUTHORIZED);
    }

    const user = req.user as UserCredential;
    if (!roles.find((r) => user.roles.indexOf(r) >= 0)) {
      throw errorResponseMessage(NetResponse.FORBIDDEN);
    }

    next();
  };
}
