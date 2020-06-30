import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import "../styles.css";

export default class Landing extends Component{
    render(){
        return (
            <div className='centerMe formatText'>
                <section>
                    <h1>
                        Welcome to Boulder Babes
                    </h1>
                    <p>hello world</p>
                    <Link to={'/Signup'}>
                        <Button type={'primary'} shape={'round'}>
                            Create New Account
                        </Button>
                    </Link>
                    <br/>
                    <br/>
                    <Link to={'/Login'}>
                        <Button type={'primary'} shape={'round'}>
                            Login to Your Account
                        </Button>
                    </Link>
                </section>
                <footer className={'pt-5'}>
                    <div className={'container text-center'}>
                        <p>&copy; Boulder Babes 2020</p>
                    </div>
                </footer>
            </div>

        );
    }
}