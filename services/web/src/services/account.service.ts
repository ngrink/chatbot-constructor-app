import { AxiosResponse } from "axios";
import { $axios } from "@utils/axios";


class AccountService {
    static async registration(name: string, surname: string, email: string, password: string): Promise<AxiosResponse> {
        const res = await $axios.post('accounts/', {
            name, surname, email, password, confirmPassword: password
        });

        return res;
    }

    static async requestResetPassword(email: string): Promise<void> {}
    static async resetPassword(token: string, newPassword: string, confirmPassword: string ): Promise<void> {}
    static async changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Promise<void> {}
}

export { AccountService };
