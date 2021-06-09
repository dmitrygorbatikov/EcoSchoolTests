import React, {useState, useEffect, useContext} from 'react';
import style from './Register.module.css';
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const Register = ( ) => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameDirty, setFirstNameDirty] = useState(false);
    const [secondNameDirty, setSecondNameDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [firstNameError, setFirstNameError] = useState("Им'я не може бути пустим");
    const [secondNameError, setSecondNameError] = useState('Прізвище не може бути пустим');
    const [phoneError, setPhoneError] = useState('Телефон не може бути пустим');
    const [passwordError, setPasswordError] = useState('Пароль не може бути пустим');
    const [formValid, setFormValid] = useState(false);
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    useEffect(() => {
        if (phoneError || passwordError || firstNameError || secondNameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [phoneError, passwordError, firstNameError, secondNameError]);

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
            case 'firstName':
                setFirstNameDirty(true);
                break;
            case 'secondName':
                setSecondNameDirty(true);
                break;
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
            setPasswordError('Пароль повинен бути задовж 3 чисел і меньш 8');
            if (!e.target.value) {
                setPasswordError('Пароль не може бути пустим');
            }
        } else {
            setPasswordError('');
        }
    };

    const registerHandler = async (e) => {
        e.preventDefault()
        try{
            let body = {
                'first_name': firstName,
                'second_name': secondName,
                'phone': phone,
                'password': password
            }
            const register = await request('/api/auth/register', 'POST', body)
            if(register.message != "Такой пользователь уже существует"){
                const data = await request('/api/auth/login', 'POST', body)
                auth.login(data.token, data.userId)
            }

        }catch (e) {
        }
    }

    return (
        <div className={style.login}>
            <div className="container">
                <form className={style.form}>
                    <h1 className={style.title}>Реєстрація</h1>
                    {firstNameDirty && firstNameError && <div style={{ color: 'red' }}>{firstNameError}</div>}
                    <input
                        onChange={e => {
                            setFirstName(e.target.value)
                            let letters = /^[А-Яа-я]+$/;

                            if(e.target.value.match(letters) || e.target.value.includes('ї') || e.target.value.includes('і')){
                                setFirstNameError('')
                            }
                            else if(e.target.value.length == 0){
                                setFirstNameError("Ім'я не може бути пустим")
                            }
                            else{
                                setFirstNameError("Ім'я може містити тільки символи [А-Яа-я]")
                            }
                        }}
                        value={firstName}
                        onBlur={(e) => blurHandler(e)}
                        name="firstName"
                        type="text"
                        placeholder="Им'я..."
                    />
                    {secondNameDirty && secondNameError && <div style={{ color: 'red' }}>{secondNameError}</div>}
                    <input
                        onChange={e => {
                            setSecondName(e.target.value)
                            let letters = /^[А-Яа-я]+$/;
                            if(e.target.value.match(letters) || e.target.value.includes('ї') || e.target.value.includes('і')){
                                setSecondNameError('')
                            }
                            else if(e.target.value.length == 0){
                                setSecondNameError("Прізвище не може бути пустим")
                            }
                            else{
                                setSecondNameError("Прізвище може містити тільки символи [А-Яа-я]")
                            }
                        }}
                        value={secondName}
                        onBlur={(e) => blurHandler(e)}
                        name="secondName"
                        type="text"
                        placeholder="По-батькові..."
                    />
                    {phoneDirty && phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
                    <input
                        onChange={(e) => phoneHandler(e)}
                        value={phone}
                        onBlur={(e) => blurHandler(e)}
                        name="phone"
                        type="tel"
                        placeholder="Номер телефону..."
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
                    <button onClick={registerHandler} disabled={!formValid} className={style.btn} type="submit">
                        Увійти
                    </button>
                    <p>Вже є аккаунт?</p>  <Link to={`/login`}>Увійти</Link>

                </form>
            </div>
        </div>
    );
};

export default Register;
