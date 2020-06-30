import React, { Component } from "react";
import { Link } from "react-router-dom";
import {signin, signInWithGoogle, signInWithGithub, signInWithFacebook} from "../helpers/auth";
import 'antd/dist/antd.css';
import '../styles.css';
import LoginForm from "../components/LoginForm";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            email: "",
            password: "",
            remember: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
        this.facebookSignIn = this.facebookSignIn.bind(this);
    }

    handleChange(event){
        if (event.target.name === 'remember'){
            this.setState({
                remember: !this.state.remember,
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    async handleSubmit(){
        // event.preventDefault();
        this.setState({ error: '' });
        try{

            await signin(this.state.email, this.state.password, this.state.remember);
        } catch(error){
            this.setState({error: error.message});
        }
    }

    async googleSignIn(){
        try{
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
            this.setState({error: error.message});
        }
    }

    async githubSignIn(){
        try{
            await signInWithGithub();
        } catch (error) {
            console.log(error);
            this.setState({ error: error.message });
        }
    }

    async facebookSignIn(){
        try{
            await signInWithFacebook();
        } catch (error){
            console.log(error);
            this.setState({error: error.message});
        }
    }


    render(){
        return (
            <div className='centerMe'>
                <div >
                    <h1>Login to <Link to={'/'}>Boulders</Link></h1>
                    <p>
                        Fill in the form below to login to your account
                    </p>
                    <LoginForm buttonText={'Login'}
                               message={'You can also sign in with any of these services.'}
                               handleSubmit={this.handleSubmit}
                               handleChange={this.handleChange}
                               facebookSignIn={this.facebookSignIn}
                               googleSignIn={this.googleSignIn}
                               githubSignIn={this.githubSignIn}

                    />
                </div>
                <footer className={'pt-5'}>
                    <div className={'container text-center'}>
                        <p>&copy; Boulder Babes 2020</p>
                    </div>
                </footer>
            </div>

        );
    }

}