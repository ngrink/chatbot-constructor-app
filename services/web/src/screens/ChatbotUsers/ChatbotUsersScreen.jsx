import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import useAsync from "react-hook-use-async";
import moment from "moment-timezone";

import { useStore } from "@hooks/useStore";
import { UserService } from "@services/user.service";

import screen from "../Screen.module.scss";
import styles from "./ChatbotUsersScreen.module.scss";


const ChatbotUsersScreen = observer(() => {
  const { ChatbotStore, ChannelStore } = useStore();
  const projectId = ChatbotStore.chatbot?.id;

  const usersQuery = useAsync(async () => {
    let users = await UserService.getUsers(projectId)
    if (!users) {
        return []
    }

    return users;
  })


  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);

    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  }

  // const exportToJSON = (e) => {
  //   e.preventDefault()
  //   downloadFile({
  //     data: JSON.stringify(usersQuery.result),
  //     fileName: 'users.json',
  //     fileType: 'text/json',
  //   })
  // }

  const exportCSV = (e) => {
    e.preventDefault()

    let headers = Object.keys(usersQuery.result[0]).join(',') + "\n";
    let items = usersQuery.result.map(v => Object.values(v).join(',') + "\n");
    let data = headers + items;

    downloadFile({
      data: data,
      fileName: 'users.csv',
      fileType: 'text/csv',
    })
  }

  const exportXML = (e) => {
    e.preventDefault();

    let data = (
      `<Users>
        ${usersQuery.result.map(u => (
          `<User>
            <id>${u.id}</id>
            <projectId>${u.projectId}</projectId>
            <channelType>${u.channelType}</channelType>
            <channelUserId>${u.channelUserId}</channelUserId>
            <name>${u.name}</name>
            <createdAt>${u.createdAt}</createdAt>
            <updatedAt>${u.updatedAt}</updatedAt>
          </User>`
        ))}
      </Users>`
    )

    downloadFile({
      data: data,
      fileName: 'users.xml',
      fileType: 'text/xml',
    })
  }

  return (
    <div className={screen.screen}>
      <div className={screen.header}>
        <h1 className={screen.title}>
            Пользователи
        </h1>
        <div className={styles.exports}>
          <button onClick={exportCSV}>
            <img src="/assets/img/icons/csv.svg" alt="Download in CSV"/>
          </button>
          <button onClick={exportXML}>
            <img src="/assets/img/icons/xml.svg" alt="Download in XML"/>
          </button>
        </div>
      </div>
      <ul className={styles.users}>
        <li key="headers" className={styles.users__header}>
            <div>Имя пользователя</div>
            <div>Cсылка</div>
            <div>Первый контакт</div>
            <div>Последний контакт</div>
        </li>
        {usersQuery.result && usersQuery.result.map((user) => (
          <li key={user.id} className={styles.user}>
            <div>{user.name}</div>
            <a href={`https://vk.com/id${user.channelUserId}`}>
              {`${user.channelType}/${user.channelUserId}`}
            </a>
            <div>{moment(user.createdAt).tz('Europe/Moscow').format('DD/MM/YYYY HH:mm:ss')}</div>
            <div>{moment(user.updatedAt).tz('Europe/Moscow').format('DD/MM/YYYY HH:mm:ss')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
})

export { ChatbotUsersScreen };
