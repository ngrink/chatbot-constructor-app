import jwt from 'jsonwebtoken';


export class TokenService {
  static async generateToken(payload, secret, options) {
    return jwt.sign(payload, secret, options);
  }

  static async decodeToken(payload, options) {
    return jwt.decode(payload, options);
  }

  static async verifyToken(token, secret, options) {
    try {
      return jwt.verify(token, secret, options);
    } catch (e) {
      return null;
    }
  }
}
