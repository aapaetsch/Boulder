import React, { Component } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/Landing';
import { auth } from './services/firebase';
import {LoadingOutlined} from '@ant-design/icons';
import boulderProblem from "./images/boulderProblem.jpg";
import './styles.css';

export function PrivateRoute({component: Component, authenticated, ...rest}) {
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
    console.log(authenticated);
    return(
        <Route
    {...rest}
    render={(props) => authenticated === false
        ? <Component {...props}/>
: <Redirect to={'/home'}/>
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
            (<div className='centerMe' style={{backgroundImage:`url(${boulderProblem})`}}>
                <h1>
                    <LoadingOutlined spin={true}/> Loading...
                </h1>

            </div>)
            :(


                <div style={{textAlign: 'center',  height: '100vh',width:'100%'}}>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Landing}/>
                            <PrivateRoute path='/Home'
                            authenticated={this.state.authenticated}
                            component={Home}
                            />
                            <PublicRoute path='/login'
                            authenticated={this.state.authenticated}
                            component={Login}
                            />
                            <PublicRoute path='/signup'
                            authenticated={this.state.authenticated}
                            component={SignUp}
                            />
                        </Switch>
                    </Router>
                </div>
            );
    }
}
