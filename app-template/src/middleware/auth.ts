import passport from 'passport';
import { UserRole, UserCredential } from '../model/credentials';
import { Request, Response, NextFunction } from 'express';
import { errorResponseMessage } from '../Constants/Constants';
import { NetResponse } from '../Constants/Constants';
import { getConfigValue } from '../utils/config';

export function authenticate() {
  if (getConfigValue('AUTH') === 'true') {
    return passport.authenticate('jwt', { session: false });
  }

  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (getConfigValue('AUTH') === 'true') {
      if (!req.isAuthenticated()) {
        throw errorResponseMessage(NetResponse.UN_AUTHORIZED);
      }

      const user = req.user as UserCredential;
      if (!roles.find((r) => user.roles.indexOf(r) >= 0)) {
        throw errorResponseMessage(NetResponse.FORBIDDEN);
      }
    }
    next();
  };
}
