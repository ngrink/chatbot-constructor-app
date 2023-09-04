import { configurePersistable } from 'mobx-persist-store';

configurePersistable(
    {
      storage: window.localStorage,
      expireIn: 3600000 * 24 * 30,
      removeOnExpiration: true,
      stringify: false,
      debugMode: true,
    },
    { delay: 200, fireImmediately: false }
);
