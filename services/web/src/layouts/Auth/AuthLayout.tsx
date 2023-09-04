import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useStore } from "@hooks/useStore";
import { routes } from "@utils/constants";
import { Header } from "@components/Header";


const AuthLayout: FC = () => {
    const { AuthStore } = useStore();

    if (AuthStore.isAuth) {
        return (
            <Navigate
                to={routes.CHATBOTS}
                replace
            />
        )
    }

    return (
        <>
            <Header type="minimal" />
            <Outlet />
        </>
    );
}

export { AuthLayout };
