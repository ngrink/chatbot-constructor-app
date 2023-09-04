import { TokenService } from "#utils/modules/token";
import { SessionModel } from "./submodels/session.model";


export class AuthServiceToken {
  static async generateAccessToken(payload) {
    return await TokenService.generateToken(
      payload,
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.NODE_ENV == 'development' ? '1h' : '10m'}
    );
  }

  static async generateRefreshToken(payload) {
    return await TokenService.generateToken(
        payload,
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '30d'}
    );
  }

  static async verifyAccessToken(token) {
    return await TokenService.verifyToken(token, process.env.JWT_ACCESS_SECRET);
  }

  static async verifyRefreshToken(token) {
    return await TokenService.verifyToken(token, process.env.JWT_REFRESH_SECRET);
  }

  // TODO: save to redis as hash(accountId, userIP, userAgent) => token, and timeit
  static async saveRefreshToken(loginData, refreshToken) {
    const [data, created] = await SessionModel.findOrCreate({
      where: {...loginData},
      defaults: {
        refreshToken
      }
    })

    if (!created) {
      data.refreshToken = refreshToken;
      await data.save()
    }

    return data
  }

  static async findRefreshToken(refreshToken) {
    return await SessionModel.findOne({ where: { refreshToken } })
  }

  static async removeRefreshToken(accountId, userIP, userAgent) {
    await SessionModel.destroy({ where: {
      accountId,
      userIP,
      userAgent
    }});
  }
}
