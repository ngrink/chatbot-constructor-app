import { $axios } from "@utils/axios";
import { Store } from '@store/index';


class AuthService {
    static async login(login: string, password: string): Promise<void> {
        const { data } = await $axios.post<any, any>('auth/login', {login, password});

        Store.AuthStore.setIsAuth(true);
        Store.AuthStore.setAccount(data.account);
        Store.AuthStore.setAccessToken(data.accessToken);
        Store.AuthStore.setRefreshToken(data.refreshToken);
    }

    static async logout(): Promise<void> {
        await $axios.post('/auth/logout');
        Store.AuthStore.unsetAccessToken();
        Store.AuthStore.unsetRefreshToken();
    }

    static async refresh(): Promise<void> {
        const { data } = await $axios.post('/auth/refresh');
        Store.AuthStore.setAccessToken(data.accessToken);
        Store.AuthStore.setRefreshToken(data.refreshToken);
    }
}

export { AuthService };
