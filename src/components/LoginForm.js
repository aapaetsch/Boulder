import React, { Component }  from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import {GithubFilled, FacebookFilled, ChromeFilled, UserOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

export default class LoginForm extends Component {

        render() {
            const onFinish = values => {
                console.log('success:', values);
                this.props.handleSubmit();
            };
            const onFinishFailed = errorInfo => {
                console.log('failed:', errorInfo)
                alert(errorInfo.message);
            };
            const formItem = {
                width:'40%',
                margin:'auto',
                marginBottom:'1em',
                display: 'block'
            }
            return (
                <div style={{textAlign: 'center'}} >
                    <Form
                        name='normal_login'
                        className='login-form'

                        initialValues={{remember:false,}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        onChange={this.props.handleChange}>
                        <Form.Item
                            style={formItem}
                            name='emailItem'
                            rules={[{type:'email', message:'The input is not a valid Email Address!'},
                                    {required: true, message: 'Please input your Email Address!'}]}
                        >
                            <Input name={'email'} prefix={<UserOutlined className='site-form-item-icon'/>} placeholder="Email"/>
                        </Form.Item>
                        <Form.Item
                            style={formItem}
                            name={'passwordItem'}
                            rules={[{required: true, message: 'Please enter a Password!'}]}
                            >
                            <Input prefix={<LockOutlined className='site-form-item-icon'/>}
                                   type='password'
                                   name='password'
                                   placeholder='Password'/>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name='rememberedItem' valuePropName='checked' noStyle>
                                <Checkbox name='remember'>Remember me</Checkbox>
                            </Form.Item>
                            {this.props.buttonText === 'Login' ?
                                (<span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className='login-form-forgot' to='/'>
                                        Forgot Password?
                                    </Link>
                                </span>)
                                :(<div/>)}

                        </Form.Item>
                        <Form.Item>
                            <Button style={{width:'30%'}}
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button'>
                                {this.props.buttonText}
                            </Button>
                            {this.props.buttonText === 'Login' ?
                                (<span><br/><br/>Or&nbsp;&nbsp;
                                    <Link to='/signup'>Register Now!</Link></span>)
                                :(<span>
                                    <br/><br/>Or&nbsp;&nbsp;
                                    <Link to='/login'>Login Now!</Link>
                                </span>)}
                        </Form.Item>
                    </Form>

                    <div style={{textAlign: 'center'}}>

                        <p>{this.props.message}</p>
                        <Button type='primary'
                                shape='circle'
                                style={{backgroundColor:'green'}}
                                icon={<ChromeFilled/>}
                                onClick={() => this.props.googleSignIn()}/>
                                &nbsp;&nbsp;
                        <Button type='primary'
                                shape='circle'
                                icon={<FacebookFilled/>}
                                onClick={() => this.props.facebookSignIn()}/>
                                &nbsp;&nbsp;
                        <Button type='primary'
                                shape='circle'
                                style={{backgroundColor:'black'}}
                                icon={<GithubFilled/>}
                                onClick={() => this.props.githubSignIn()}/>
                        <hr />

                    </div>
                </div>


            );
        }
};
