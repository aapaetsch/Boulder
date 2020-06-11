import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithFacebook, signInWithGithub} from "../helpers/auth";
import 'antd/dist/antd.css';
import { Button } from 'antd';

import styles from "../styles.css";

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            username: '',
            email: '',
            password: '',
        }
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
        this.setState({ error: ''});
        try{
            await signup(this.state.email, this.state.password);
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

        return(
            <div className={styles.centerMe}>
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up to <Link to={'/'}>Boulders</Link> </h1>

                </form>
                <footer className={'pt-5'}>
                    <div className={'container text-center'}>
                        <p>&copy; Boulder Babes 2020</p>
                    </div>
                </footer>
            </div>
        );
    }
}