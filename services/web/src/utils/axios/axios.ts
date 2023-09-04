import axios from "axios";
import { AuthService } from "@services/auth.service";
import { Store } from "@store/store";


export const $axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

const setHeadersInterceptor = async (config: any) => {
  if (!Store.AuthStore.isAuth) {
    return config
  }

  if (config.url === '/auth/refresh') {
    config.headers['Authorization'] = `Bearer ${Store.AuthStore.refreshToken}`;
  } else {
    config.headers['Authorization'] = `Bearer ${Store.AuthStore.accessToken}`;
  }

  return config
}

const unauthorizedInterceptor = async (error: any) => {
  if (error.response.status !== 401) {
    return Promise.reject(error);
  }

  // 401 Unauthorized
  if (Store.AuthStore.isRefreshing) {
    if (error.config.url == "/auth/refresh") {
      Store.AuthStore.unsetAuth();
      Store.AuthStore.unsetTasks();
      return Promise.reject(error);
    } else {
      Store.AuthStore.addTask(error.config);
      return
    }
  }

  // 401 Unauthorized && isRefreshing = false
  Store.AuthStore.setIsRefreshing(true);
  Store.AuthStore.addTask(error.config);
  await AuthService.refresh()
    .then(() => {
      Store.AuthStore.queue.forEach((config) => $axios.request(config))
    });
}

$axios.interceptors.request.use(setHeadersInterceptor, undefined);
$axios.interceptors.response.use(undefined, unauthorizedInterceptor);
