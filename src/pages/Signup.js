import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithFacebook, signInWithGithub} from "../helpers/auth";
import 'antd/dist/antd.css';
import LoginForm from '../components/LoginForm';

export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
            remember: false,
        }
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

            await signup(this.state.email, this.state.password, this.state.remember);

        } catch(error){
            this.setState({error: error.message});

        }
    }

    async googleSignIn(){
        try{

            await signInWithGoogle(this.state.remember);
        } catch (error) {
            console.log(error);
            this.setState({error: error.message});
        }
    }

    async githubSignIn(){
        try{
            await signInWithGithub(this.state.remember);
        } catch (error) {
            console.log(error);
            this.setState({ error: error.message });
        }
    }

    async facebookSignIn(){
        try{
            await signInWithFacebook(this.state.remember);
        } catch (error){
            console.log(error);
            this.setState({error: error.message});
        }
    }
    render(){

        return(
            <div className='centerMe formatText'>

                <h1>Sign Up to <Link to={'/'}>Boulders</Link> </h1>
                <p>
                    Fill in the form below to Sign up for Boulders
                </p>
                <LoginForm buttonText='Sign Up'
                           message='You can also sign up with any of these services.'
                           handleSubmit={this.handleSubmit}
                           handleChange={this.handleChange}
                           facebookSignIn={this.facebookSignIn}
                           googleSignIn={this.googleSignIn}
                           githubSignIn={this.githubSignIn}
                />
                <footer className={'pt-5'}>
                    <div className={'container text-center'}>
                        <p>&copy; Boulder Babes 2020</p>
                    </div>
                </footer>
            </div>
        );
    }
}