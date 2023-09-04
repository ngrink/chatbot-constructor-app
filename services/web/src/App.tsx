import { FC } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from 'mobx-react-lite';

import { RequireAuth } from '@utils/hocs/RequireAuth';
import { AuthLayout } from '@layouts/Auth';
import { AppLayout } from '@layouts/App';
import { ChatbotLayout } from '@layouts/Chatbot';
import { RegistrationScreen } from '@screens/Auth/Registration';
import { LoginScreen } from '@screens/Auth/Login';
import { ChatbotScreen } from '@screens/Chatbot';
import { FAQScreen } from '@screens/ChatbotDatabase/FAQ';
import { ChatbotChannelsScreen } from '@screens/ChatbotChannels';
import { ChatbotUsersScreen } from '@screens/ChatbotUsers';
import { ChatbotDialogsScreen } from '@screens/ChatbotDialogs';
import styles from '@assets/css/App.module.scss';


const App: FC = observer(() => {
    return (
        <div className={styles.app}>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/registration" element={<RegistrationScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                </Route>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Navigate to="chatbots" replace/>} />
                        <Route path="chatbots" element={<ChatbotScreen />} />
                        <Route path="statistics" element={<h1>Statistics</h1>} />
                        <Route path="documentation" element={<h1>Documentation</h1>} />
                        <Route path="news" element={<h1>News</h1>} />
                    </Route>
                    <Route path="/chatbots/:id/" element={<ChatbotLayout />}>
                        <Route index element={<Navigate to="database/faq" replace/>} />
                        <Route path="flows" element={<h1>Flows</h1>} />
                        <Route path="database">
                            <Route index element={<Navigate to="faq" replace/>} />
                            <Route path="faq" element={<FAQScreen />} />
                            <Route path="intents" element={<h1>Intents</h1>} />
                            <Route path="entities" element={<h1>Entities</h1>} />
                        </Route>
                        <Route path="newsletters" element={<h1>Newsletters</h1>} />
                        <Route path="channels" element={<ChatbotChannelsScreen />} />
                        <Route path="dialogs" element={<ChatbotDialogsScreen />} />
                        <Route path="users" element={<ChatbotUsersScreen />} />
                        <Route path="statistics" element={<h1>Statistics</h1>} />
                        <Route path="integrations" element={<h1>Integrations</h1>} />
                        <Route path="settings" element={<h1>Settings</h1>} />
                    </Route>
                </Route>
                <Route path="*" element={<h1>404 page!!!!!</h1>} />
            </Routes>
        </div>
    );
})

export { App };
