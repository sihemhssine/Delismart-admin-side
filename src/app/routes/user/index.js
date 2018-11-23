import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const User = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/userlist`}/>
            <Route path={`${match.url}/userlist`} component={asyncComponent(() => import('./routes/UserList'))}/>
            <Route path={`${match.url}/newuser`} component={asyncComponent(() => import('./routes/NewUser'))}/>
            <Route path={`${match.url}/statistics`} component={asyncComponent(() => import('./routes/Statistics'))}/>          
           <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
        </Switch>
    </div>
);

export default User;