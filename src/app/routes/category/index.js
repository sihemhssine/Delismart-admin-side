import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Category = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/categorylist`}/>
            <Route path={`${match.url}/categorylist`} component={asyncComponent(() => import('./routes/CategoryRoute'))}/>
           <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
        </Switch>
    </div>
);

export default Category;