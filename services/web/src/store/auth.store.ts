import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';


class AuthStore {
    isAuth = false;
    isAuthLoading = false;
    isRefreshing = false;
    account = {}
    accessToken: string | null = localStorage.getItem('accessToken') || null;
    refreshToken: string | null = localStorage.getItem('refreshToken') || null;
    queue: any[] = [];

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'AuthStore',
            properties: [
                'isAuth',
                'isAuthLoading',
                'account',
                'accessToken',
                'refreshToken',
            ],
            storage: window.localStorage
        })
    }

    setIsAuth(value: boolean) {
        this.isAuth = value;
    }

    setIsAuthLoading(value: boolean) {
        this.isAuthLoading = value;
    }

    setIsRefreshing(value: boolean) {
      this.isRefreshing = value;
    }

    setAccount(account: object) {
        this.account = account;
    }

    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    }

    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken;
      localStorage.setItem('refreshToken', refreshToken);

    }

    unsetAccessToken() {
      this.accessToken = null;
      localStorage.accessToken('accessToken');
    }

    unsetRefreshToken() {
      this.refreshToken = null;
      localStorage.removeItem('refreshToken');
    }

    unsetAuth() {
      this.setIsAuth(false);
      this.setIsAuthLoading(false);
      this.setIsRefreshing(false);
      this.setAccount({});
      this.unsetAccessToken();
      this.unsetRefreshToken();
    }

    addTask(config: object) {
      this.queue.push(config);
    }

    getTasks() {
      let queue = this.queue;
      this.queue = [];

      return queue;
    }

    unsetTasks() {
      this.queue = [];
    }
}

export { AuthStore };
