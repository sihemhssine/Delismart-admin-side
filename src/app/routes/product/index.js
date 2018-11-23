import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Product  = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/ProductList`}/>
            <Route path={`${match.url}/productlist`} component={asyncComponent(() => import('./routes/ProductList'))}/>
            <Route path={`${match.url}/newproduct`} component={asyncComponent(() => import('./routes/NewProduct'))}/>
            <Route path={`${match.url}/statistics`} component={asyncComponent(() => import('./routes/Statistics'))}/>          
           <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
        </Switch>
    </div>
);

export default Product;