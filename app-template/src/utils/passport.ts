import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import store from '../store';
import config, { KnownConfigKey } from '../utils/config';
import { UserToken } from '../model/credentials';

export function initPassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (userName, password, callback) => {
        const user = store.credentials.find((u) => u.email === userName && u.password === password);

        if (user) {
          const { email, roles } = user;
          const tokenPayload: UserToken = { email, roles };
          callback(null, tokenPayload, { message: 'succeeded' });
        } else {
          callback(null, false, { message: 'failed' });
        }
      },
    ),
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.getJwtSecret(KnownConfigKey.JwtSecret),
      },
      // in this case the user token is actually the same as jwtPayload
      // can consider simply passing jwtPayload, however it might be stale (common though)
      // trade-off: lightweight token vs. required info for most API's to reduce user re-query needs
      (jwtPayload: UserToken, callback) => callback(null, jwtPayload),
    ),
  );
}
