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
        <Route key='/signup' path='/signup' component={SignUp}/>,
        <Route key='/forgot-password' path='/forgot-password' component={ForgotPassword}/>,
        <Route key='/forgot-password' path='//forgot-password' component={ResetPassword}/>,
        <Route key='/' path='/' component={SignIn}/>,
    ];

    if(user) {
        routes = [
            <Route key='/profile' path='/profile' component={Profile}/>,
            <Route key='/' path='/' component={Dashboard}/>,
        ];
    }

    return (
        <Switch>
            {routes}
        </Switch>
    );
};

export default Routes;
