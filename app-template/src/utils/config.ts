export function getConfigValue(key: string): string | undefined {
  return process.env[key];
}

export enum KnownConfigKey {
  JwtSecret = 'jwt-sign-secret',
}

function getJwtSecret(key: string): string {
  // TODO: implement properly
  return 'your_jwt_secret';
}

export default {
  getJwtSecret,
};
