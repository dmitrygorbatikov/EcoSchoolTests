import React, {useState, useEffect, useContext} from 'react';
import style from './Login.module.css';
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [phoneError, setPhoneError] = useState('Телефон не може бути пустим');
    const [passwordError, setPasswordError] = useState('Пароль не може бути пустим');
    const [formValid, setFormValid] = useState(false);
    const {request} = useHttp()
    const auth = useContext(AuthContext)

  useEffect(() => {
    if (phoneError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [phoneError, passwordError]);

  const phoneHandler = (e) => {
    setPhone(e.target.value);
    const re =
      /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/;

    if (!re.test(Number(e.target.value))) {
      setPhoneError('Некорректний телефон');
    } else {
      setPhoneError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'phone':
        setPhoneDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Пароль повинен бути задовж 3 чисел та менше ніж 8');
      if (!e.target.value) {
        setPasswordError('Пароль не може бути пустим');
      }
    } else {
      setPasswordError('');
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault()
    try{

      let body = {
        'phone': phone,
        'password': password
      }
      console.log(body)
      const data = await request('/api/auth/login', 'POST', body)
      auth.login(data.token, data.userId)

    }
    catch (e) {

    }
  }

  return (
    <div className={style.login}>
      <div className="container">
        <form className={style.form}>
          <h1 className={style.title}>Вхід</h1>
          {phoneDirty && phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
          <input
            className={style.phone}
            onChange={(e) => phoneHandler(e)}
            value={phone}
            onBlur={(e) => blurHandler(e)}
            name="phone"
            type="tel"
            placeholder="Номер телефона..."
          />
          {passwordDirty && passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
          <input
            onChange={(e) => passwordHandler(e)}
            value={password}
            onBlur={(e) => blurHandler(e)}
            name="password"
            type="password"
            placeholder="Пароль..."
          />
          <button
              disabled={!formValid}
              className={style.btn} onClick={loginHandler}>
            Увійти
          </button>
          <p>Ще немає аккаунту?</p>  <Link to={`/register`}>Зареєструватись</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
