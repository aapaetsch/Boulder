import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGithub, signInWithFacebook} from "../helpers/auth";
import 'antd/dist/antd.css';
import styles from '../styles.css';
import { Button } from 'antd';
import {GithubFilled, FacebookFilled, ChromeFilled} from '@ant-design/icons';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
        this.facebookSignIn = this.facebookSignIn.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event){
        event.preventDefault();
        this.setState({error:""});
        try{
            await signin(this.state.email, this.state.password);
        } catch(error){
            this.setState({error: error.message});
        }
    }

    async googleSignIn(){
        try{
            await signInWithGoogle();
        } catch(error){
            this.setState({error:error.message});
        }
    }

    async githubSignIn(){
        try{
            await signInWithGithub();
        } catch(error){
            this.setState({error:error.message});
        }
    }

    async facebookSignIn(){
        try{
            await signInWithFacebook();
        } catch(error){
            this.setState({error:error.message});
        }
    }

    render(){
        return (
            <div className={styles.centerMe}>
                <form autoComplete={'off'} onSubmit={this.handleSubmit}>
                    <h1>Login to <Link to={'/'}>Boulder Babes</Link></h1>
                    <p>
                        Fill in the form below to login to your account
                    </p>
                    <div className={'form-group'}>
                        <input
                            className={'form-control'}
                            placeholder={"Email"}
                            name={'email'}
                            type={'email'}
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            className={'form-control'}
                            placeholder={'Password'}
                            name={'password'}
                            onChange={this.handleChange}
                            value={this.state.password}
                            type={'password'}/>
                    </div>
                    <div className={'form-group'}>
                        {this.state.error ? (
                            <p className={'text-danger'}>{this.state.error}</p>
                        ) : null}
                        <Button type={'primary'} shape={'round'}>Login</Button>
                    </div>
                    <div>
                        <p>You can also login with any of these services</p>
                        <Button type={'primary'}
                                shape={'circle'}
                                icon={<ChromeFilled/>}
                                onClick={this.googleSignIn}/>
                        <Button type={'primary'}
                                shape={'circle'}
                                icon={<FacebookFilled/>}
                                onClick={this.facebookSignIn}/>
                        <Button type={'primary'}
                                shape={'circle'}
                                icon={<GithubFilled/>}
                                onClick={this.githubSignIn}/>
                    </div>
                    <hr/>
                    <p>
                        Don't have an account? <Link to={'/signup'}><Button type={'primary'}>Sign up</Button></Link>
                    </p>

                </form>

            </div>

        );
    }

}