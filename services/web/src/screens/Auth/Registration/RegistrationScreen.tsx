import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@components/Button";
import { AccountService } from "@services/account.service";
import classes from "../Auth.module.css";


const RegistrationScreen: FC = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');

    const navigate = useNavigate();

    const register = async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      AccountService.registration(name, surname, email, password)
        .then(() => {
          alert('Регистрация прошла успешно');
          navigate(`/login`, {state: {email}});
        });
    }

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', flex: '1 1 auto', marginTop: '-75px'}}>
            <form className={classes.form}>
                <div className={classes.formItem}>
                    <label htmlFor="name">Имя</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className={classes.formItem}>
                    <label htmlFor="surname">Фамилия</label>
                    <input type="text" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                </div>
                <div className={classes.formItem}>
                    <label htmlFor="email">Электронная почта</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={classes.formItem}>
                    <label htmlFor="password">Пароль</label>
                    <div className="form__password-wrap">
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <i className="form__password-show fas fa-eye"></i>
                    </div>
                </div>
                <div className={classes.formItem}>
                    <label htmlFor="passwordConfirm">Подтверждение пароля</label>
                    <div className="form__password-wrap">
                        <input type="password" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm} onChange={(e) => setpasswordConfirm(e.target.value)} required />
                        <i className="form__password-show fas fa-eye"></i>
                    </div>
                </div>
                <div className={classes.buttons}>
                    <Button type="main" onClick={register}>Зарегистрироваться</Button>
                    <Link to="/login">
                        <Button type="ghost" fluid>Есть аккаунт? Войти</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { RegistrationScreen };
