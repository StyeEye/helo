// NPM packages
import { Switch, Route } from 'react-router-dom';
import React from 'react';

// Local components
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';

export default (
    <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/post/:postid" component={Post} />
        <Route path="/new" component={Form} />
        <Route path="/" component={Auth} />
    </Switch>
);