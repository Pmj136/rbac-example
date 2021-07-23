import React from 'react'
import {HashRouter, Switch, Route, Redirect} from "react-router-dom"
import Login from "../pages/login/Login";
import AppLayout from "../layout";
import {useSelector} from "react-redux";


function RouterView() {
    const {isLogin} = useSelector(state => state.user);

    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" render={() => (
                    isLogin ? <AppLayout/> : <Redirect to="/login"/>
                )}/>
            </Switch>
        </HashRouter>
    )
}

export default RouterView