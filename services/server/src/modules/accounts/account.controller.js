import { AccountService } from "./account.service";


export class AccountController {
    static async createAccount(req, res, next) {
        try {
            const { name, surname, email, password, confirmPassword } = req.body;

            await AccountService.createAccount(name, surname, email, password, confirmPassword);
            res.status(200).json("OK");
        } catch (e) {
            next(e)
        }
    }

    // static async updateAccount(req, res, next) {
    //     try {

    //     } catch (e) {
    //         next(e)
    //     }
    // }

    // static async deleteAccount(req, res, next) {
    //     try {

    //     } catch (e) {
    //         next(e)
    //     }
    // }

    static async activateAccount(req, res, next) {
        try {
            const { token } = req.params;

            await AccountService.activateAccount(token);
            res.status(200).json("OK");
        } catch (e) {
            next(e)
        }
    }

    static async passwordResetRequest(req, res, next) {
        try {
            const { email } = req.body;

            await AccountService.passwordResetRequest(email);
            res.status(200).json("OK");
        } catch (e) {
            next(e)
        }
    }

    static async passwordReset(req, res, next) {
        try {
            const { token } = req.params;
            const { password, confirmPassword } = req.body;

            await AccountService.passwordReset(token, password, confirmPassword);
            res.status(200).json("OK");
        } catch (e) {
            next(e)
        }
    }

    static async passwordChange(req, res, next) {
        try {
            const { accountId } = req.user;
            const { currentPassword, newPassword, confirmPassword } = req.body;

            await AccountService.changePassword(accountId, currentPassword, newPassword, confirmPassword);
            res.status(200).json("OK");
        } catch (e) {
            next(e)
        }
    }
}
