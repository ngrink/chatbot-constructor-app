import { FC, useState, FormEvent, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Button } from "@components/Button";
import { AuthService } from "@services/auth.service";
import { routes } from "@utils/constants";
import classes from "../Auth.module.css";


const LoginScreen: FC = observer(() => {
    const navigate = useNavigate();
    const { state }: any = useLocation();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isErrorState, setIsErrorState] = useState(false);
    const location = useLocation();

    useEffect(() => {
      if (state && state.email) {
        setLogin(state.email);
      }
    }, [])

    const handleLogin = async (e: FormEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            await AuthService.login(login, password);

            const redirectedFrom = (location.state as any)?.from?.pathname;
            if (redirectedFrom) {
                navigate(redirectedFrom, { replace: true });
            } else {
                navigate(routes.CHATBOTS, { replace: true });
            }
        } catch (e: any) {
            setIsErrorState(true)
        }
    }

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', flex: '1 1 auto', marginTop: '-75px'}}>
            <form className={classes.form}>
                <div className={classes.formItem}>
                    <label htmlFor="login">Логин</label>
                    <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
                </div>
                <div className={classes.formItem}>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {isErrorState &&
                    <div className={classes.formItem} style={{color: '#e11717'}}>
                        Логин или пароль неверны
                    </div>
                }
                <div className={classes.buttons}>
                    <Button type="main" onClick={handleLogin}>Войти</Button>
                    <Link to="/registration">
                        <Button type="ghost" fluid>Зарегистрироваться</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
})

export { LoginScreen };
