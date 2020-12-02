import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IVerifyOptions } from 'passport-local';
import config, { KnownConfigKey } from '../utils/config';
import { NetResponse, translate } from '../Constants/Constants';

const router = express.Router();
const jwtSecret = config.getJwtSecret(KnownConfigKey.JwtSecret);

router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const handler = passport.authenticate('local', { session: false }, (err: Error, user: any, info: IVerifyOptions) => {
    if (err || !user) {
      return res.status(translate(NetResponse.BAD_REQUEST_VALIDATION)).send({
        message: 'Failed',
        user,
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(translate(NetResponse.BAD_REQUEST_VALIDATION)).send(error);
      }

      jwt.sign(user, jwtSecret, (jwtError: Error | null, token?: string) => {
        if (jwtError) {
          res.status(translate(NetResponse.BAD_REQUEST_VALIDATION)).send(jwtError);
        } else {
          res.status(translate(NetResponse.SUCCESS)).send({ user, token });
        }
      });

      // jwt.sign(user, jwtSecret, { algorithm: 'HS256' }, function (error, token) {
      //   if (error) {
      //     res.status(translate(NetResponse.BAD_REQUEST_VALIDATION)).send(error);
      //   } else {
      //     res.status(translate(NetResponse.SUCCESS)).send({ user, token });
      //   }
      // });
    });
  });

  handler(req, res, next);
});

export default router;
