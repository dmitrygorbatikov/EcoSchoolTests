import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components';
import { Login, Home, Quiz, StatisticsPage, QuizResultPage } from './pages';
import './scss/app.scss';
import {useAuth} from "./hooks/auth.hook";
import {useRoutes} from "./routes";
import {AuthContext} from "./context/AuthContext";


function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    if(!ready){
        return <h1>Loading..</h1>
    }
    return (


            <AuthContext.Provider  value={{
                token, login, logout, userId, isAuthenticated
            }}>
            <Router>
                <div className="wrapper">
                {
                    isAuthenticated && <Header/>

                }
                {routes}
                </div>
            </Router>
        </AuthContext.Provider>

    );
}

export default App;
