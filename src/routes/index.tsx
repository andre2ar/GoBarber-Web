import React from "react";
import {Route} from 'react-router-dom'
import { Switch } from 'react-router-dom';

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import {useAuth} from "../hooks/auth";

const Routes: React.FC = () => {
    const { user } = useAuth();
    let routes = [
        <Route path='/signup' component={SignUp}/>,
        <Route path='/forgot-password' component={ForgotPassword}/>,
        <Route path='/reset-password' component={ResetPassword}/>,
        <Route path='/' component={SignIn}/>,
    ];

    if(user) {
        routes = [
            <Route path='/profile' component={Profile}/>,
            <Route path='/' component={Dashboard}/>,
        ];
    }

    return (
        <Switch>
            {routes}
        </Switch>
    );
};

export default Routes;
