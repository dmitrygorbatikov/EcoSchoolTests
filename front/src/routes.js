import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import {Home, Login, Quiz, QuizResultPage, StatisticsPage} from "./pages";
import Register from "./pages/Register";

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/quiz/:id">
                    <Quiz/>
                </Route>
                <Route path="/quiz-result/:id" exact>
                    <QuizResultPage/>
                </Route>
                <Route path="/statistics" exact>
                    <StatisticsPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/register" exact>
                <Register />
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}