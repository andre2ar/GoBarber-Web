import React from "react";
import Route from "./Route";
import { Switch } from 'react-router-dom';

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

const Routes: React.FC = () => (
    <Switch>
        <Route path='/dashboard' isPrivate component={Dashboard}/>

        <Route path='/signup' component={SignUp}/>
        <Route path='/' component={SignIn}/>
    </Switch>
);

export default Routes;
