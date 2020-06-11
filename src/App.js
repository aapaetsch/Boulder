import React, { Component } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import createUsername from './pages/CreateUsername';
import Landing from './pages/Landing';
import { auth } from './services/firebase';
import {LoadingOutlined} from '@ant-design/icons';

function PrivateRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
    {...rest}
    render={(props) => authenticated === true
        ? <Component {...props}/>
: <Redirect to={{pathname:'/login', state:{from: props.location}}}/>}
    />
);
}

function PublicRoute({ component: Component, authenticated, ...rest}){
    return(
        <Route
    {...rest}
    render={(props) => authenticated === false
        ? <Component {...props}/>
: <Redirect to={'/Home'}/>
}
    />
);
}

export default class App extends Component{
    constructor(){
        super();
        this.state = {
            authenticated: false,
            loading: true,
        };
    }

    componentDidMount(){
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false,
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                });
            }
        });
    }
    render(){
        return this.state.loading === true ?
            (<div>
            <h1 style={{margin:'auto'}}>
    <LoadingOutlined spin={true}/> Loading...
        </h1>
        </div>) :(
        <Router>
        <Switch>
        <Route exact path='/' component={Landing}/>
        <PrivateRoute path={'/CreateUsername'}
        authenticated={this.state.authenticated}
        component={createUsername}
        />
        <PrivateRoute path={'/Home'}
        authenticated={this.state.authenticated}
        component={Home}
        />
        <PublicRoute path={'/login'}
        authenticated={this.state.authenticated}
        component={Login}
        />
        <PublicRoute path={'/signup'}
        authenticated={this.state.authenticated}
        component={Signup}
        />
        </Switch>
        </Router>
    );
    }
}
