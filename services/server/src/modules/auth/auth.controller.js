import { AuthService } from './auth.service';


export class AuthController {
  static async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const userAgent = req.useragent.source;

      const { accessToken, refreshToken, accountData } = await AuthService.login(login, password, userIP, userAgent); // TODO: accountData without exp ai

      res.status(200).json({account: accountData, accessToken, refreshToken});
    } catch (e) {
      next(e);
    }
  }

  static async logout(req, res, next) {
    try {
      const { accountId } = req.account;
      const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const userAgent = req.useragent.source;

      await AuthService.logout(accountId, userIP, userAgent);
      res.status(200).json("OK");
    } catch (e) {
      next(e);
    }
  }

  static async refreshTokens(req, res, next) {
    try {
      const {refreshToken: token} = req.header('Authorization').split(" ")[1];
      const {accessToken, refreshToken} = await AuthService.refreshTokens(token);

      res.status(200).json({accessToken, refreshToken});
    } catch (e) {
      next(e);
    }
  }
}
