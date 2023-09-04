import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";


const AppLayout: FC = () => {
    return (
        <>
            <div style={{flex: "1 0 auto"}}>
                <Header type="main" />
                <Outlet />
            </div>
            <div style={{flex: "0 0 auto"}}>
                <Footer />
            </div>
        </>
    );
}

export { AppLayout };
