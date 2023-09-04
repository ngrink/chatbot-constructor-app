import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';


class DialogsStore {
    dialogs: object = {};
    currentDialogId: number | null = null;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
        makePersistable(this, {
            name: 'DialogStore',
            properties: [
                'dialogs',
                'currentDialogId'
            ],
            storage: window.localStorage
        })
    }

    setDialogs = (dialogs: Array<any>) => {
      let groupBy = function(xs: any, key: any) {
        return xs.reduce(function(rv: any, x: any) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      let groupedMessages = groupBy(dialogs, 'channelUserId')
      this.dialogs = groupedMessages;
    }

    setCurrentDialogId = (channelUserId: number) => {
      this.currentDialogId = channelUserId;
  }
}


export { DialogsStore };
