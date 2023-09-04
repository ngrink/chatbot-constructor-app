import bcrypt from "bcrypt";

import { TokenService } from "#utils/modules/token";
import { AccountService } from "#accounts";

import { AuthServiceToken } from "./auth.service.token";
import { AuthError } from "./auth.exceptions";
import { AccessPayloadDto } from "./dto/access.payload.dto";


export class AuthService {
  static async login(login, password, userIP, userAgent) {
    // Validation
    if (!login || !password) {
      throw AuthError.BadCredentials();
    }

    // Fetch user from DB
    const account = await AccountService.getAccountByLogin(login)
    if (!account) {
      throw AuthError.BadCredentials();
    }

    // Compare passwords
    const match = await bcrypt.compare(password, account.password);
    if (!match) {
      throw AuthError.BadCredentials();
    }

    // Generate and save tokens
    const { accessToken, refreshToken } = await AuthService._generateAndSaveTokens(account, userIP, userAgent);
    const accountData = await TokenService.decodeToken(accessToken);

    return { accessToken, refreshToken, accountData }
  }

  static async logout(accountId, userIP, userAgent) {
    AuthServiceToken.removeRefreshToken(accountId, userIP, userAgent);
  }

  static async refreshTokens(refreshToken) {
    if (!refreshToken) {
      throw AuthError.Unauthorized();
    }

    const token = await AuthServiceToken.verifyRefreshToken(refreshToken);
    const tokenDB = await AuthServiceToken.findRefreshToken(refreshToken);
    if (!token || !tokenDB) {
      throw AuthError.Unauthorized();
    }

    // Refreshing
    const { accountId, userIP, userAgent } = tokenDB;
    const account = await AccountService.getAccount(accountId);

    const { accessToken, refreshToken: newRefreshToken } = await AuthService._generateAndSaveTokens(account, userIP, userAgent);
    return { accessToken, refreshToken: newRefreshToken }
  }

  static async _generateAndSaveTokens(account, userIP, userAgent) {
    const accountData = new AccessPayloadDto(account);
    const accessToken = await AuthServiceToken.generateAccessToken({...accountData})

    const loginData = { accountId: account.id, userIP, userAgent }
    const refreshToken = await AuthServiceToken.generateRefreshToken(loginData)
    await AuthServiceToken.saveRefreshToken(loginData, refreshToken)

    return { accessToken, refreshToken }
  }
}
