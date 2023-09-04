import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';


class ConfigStore {
    configId: string | null = null;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
        makePersistable(this, {
            name: 'ConfigStore',
            properties: [
                'configId',
            ],
            storage: window.localStorage
        })
    }

    setConfigId = (configId: string) => {
        this.configId = configId;
    }
}

export { ConfigStore };
