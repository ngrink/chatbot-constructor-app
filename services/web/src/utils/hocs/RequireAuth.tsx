import React, { FC, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useStore } from "@hooks/useStore";
import { AuthService } from "@services/auth.service";
import { routes } from "@utils/constants";


const RequireAuth: FC = observer(() => {
    const { AuthStore } = useStore();
    const location = useLocation();

    // TODO Check auth on server with refresh
    // useEffect(() => {
    //     async function checkAuth() {
    //         try {
    //             AuthStore.setIsAuthLoading(true);
    //             await AuthService.refresh();
    //             AuthStore.setIsAuth(true);
    //         } catch (e) {
    //             AuthStore.setIsAuth(false);
    //         } finally {
    //             AuthStore.setIsAuthLoading(false);
    //         }
    //     };
    //     checkAuth();
    // });

    if (AuthStore.isAuthLoading) {
        return null;
    }

    if (!AuthStore.isAuth) {
        return (
            <Navigate
                to={routes.LOGIN}
                state={{ from: location }}
                replace
            />
        )
    }

    return (
        <Outlet />
    );
})

export { RequireAuth };
