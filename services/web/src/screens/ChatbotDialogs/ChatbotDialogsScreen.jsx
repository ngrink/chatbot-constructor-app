import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import useAsync from "react-hook-use-async";
import moment from "moment-timezone";

import { useStore } from "@hooks/useStore";
import { DialogService } from "@services/dialog.service";
import styles from "./ChatbotDialogsScreen.module.scss";


const ChatbotDialogsScreen = observer(() => {
  const { ChatbotStore, DialogsStore } = useStore();
  const projectId = ChatbotStore.chatbot?.id;

  useAsync(async () => {
    let dialogs = await DialogService.getDialogs(projectId)
    if (!dialogs) {
        return []
    }

    DialogsStore.setDialogs(dialogs);
    return;
  })

  const setCurrentDialogId = (e) => {
    e.preventDefault();
    let dialogId = e.currentTarget .getAttribute("data-dialog-id")
    DialogsStore.setCurrentDialogId(dialogId);
  }

  return (
    <div className={styles.screen}>
      <ul className={styles.navigation}>
        {DialogsStore.dialogs && Object.values(DialogsStore.dialogs).map(d => (
          <div
            key={d[0].channelUserId}
            className={`${styles.dialog} ${DialogsStore.currentDialogId == d[0].channelUserId ? styles.dialog__active: null}`}
            data-dialog-id={d[0].channelUserId}
            onClick={setCurrentDialogId}
          >
            <div className={styles.dialog__inner}>
              <div className={styles.dialog_avatar_wrapper}>
                <img className={styles.dialog_avatar} src={d[0].user.photo} alt="" />
                <img className={styles.channelType} src={`/assets/img/icons/${d[0].channelType}.png`} />
              </div>
              <div className={styles.dialog_wrapper}>
                <div className={styles.dialog_name}>{d[0].user.name}</div>
                <div className={styles.dialog_last_message}>{d[0].message}</div>
              </div>
              <div className={styles.time}>
                {moment.unix(d[0].createdAt).tz('Europe/Moscow').format("HH:mm")}
              </div>
            </div>
          </div>
        ))}
      </ul>
      <div className={styles.dialog_content}>
        {DialogsStore.currentDialogId && DialogsStore.dialogs[DialogsStore.currentDialogId].slice().reverse().map((message) => (
          <div key={message.id} className={styles.message}>
            <div className={styles.message_user}>
              <div className={styles.message_header}>{message.user.name} - {moment.unix(message.createdAt).tz('Europe/Moscow').format("HH:mm")}</div>
              <div className={styles.message_content}>{message.message}</div>
            </div>
            <div className={styles.message_bot}>
              <div className={styles.message_header}>{"Chatbot"}</div>
              <div className={styles.message_content}>{message.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
})

export { ChatbotDialogsScreen };
