import React, { Component } from 'react';
import { Layout, Menu, Avatar, Badge, message } from 'antd';
import { auth} from '../services/firebase';
import { getUser, createUser } from '../services/firestore';
import {  UserOutlined, ImportOutlined, MessageOutlined, BellOutlined} from '@ant-design/icons';
import ProfilePage from "./usrprofile/ProfilePage";
import Messages from "./messages/Messages";
const { Header, Footer, Content} = Layout;

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: 'profile',
            userProfile: {
                name: 'null',
                usrName: 'null',
                location: 'undefined',
                creationDate: 'null',
                followers: 0,
                following: 0,
                photo: 'null',
                skill: 'null',
                posts: [],
                chatThreads: [],
            }


        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    handleMenuClick = e =>{
        console.log('click', e);
        this.setState({
            selected: e.key
        });
        this.forceUpdate();
    }


    componentWillMount() {
        this.loadUser(auth().currentUser.uid)
            .then((result) => {if (result === false){auth().signOut()}});
    }


    async loadUser(uid) {
        const user = await getUser(uid);

        if (user === false){
            //If the user is new
            const newUser = await createUser(uid);
            if (newUser === false){
                //Error creating new user
                message.error('There was an error creating your account.');
                return false;
            } else {
                console.log('User created',newUser);
                message.success('User Created Successfully!');
                await this.setState({
                    userProfile: newUser,
                })
                return true;
            }
        } else {
            //If the user exists
            console.log('user found', user);
            message.success( 'Logged in as '+ user.usrName);
            await this.setState({
               userProfile: user,
            });
            return true;
        }
    }

    renderSwitch(content){
        switch (content){
            case 'profile':
                return <ProfilePage myProfile={true} profile={this.state.userProfile}/>;
            case 'messages':
                return <Messages profile={this.state.userProfile}/>;
            default:
                return <p> hello world</p>;
        }

    }



    render(){
        return (
            <div>

                <Layout>
                    <Header theme='light'>

                        <Menu
                            onClick={this.handleMenuClick}
                            theme='light'
                            selectedKeys={this.state.selected}
                            mode='horizontal'>
                            <Menu.Item
                                key='home'
                                title='Home'>
                                <h2>Boulders</h2>
                            </Menu.Item>
                            <Menu.Item
                                key='profile'
                                title='Profile'>
                                <Avatar icon={<UserOutlined/>} src={this.state.userProfile.photo}/>
                                &nbsp;{this.state.userProfile.usrName}
                            </Menu.Item>
                            <Menu.Item
                                key='messages'
                                title='Messages'>
                                <Badge
                                    count={0}
                                    showZero
                                    title='Messages'>
                                    <MessageOutlined/>
                                </Badge>
                            </Menu.Item>
                            <Menu.Item
                                key='notifications'
                                title='Notifications'
                                icon={<BellOutlined/>}>

                            </Menu.Item>
                            <Menu.Item
                                onClick={() => auth().signOut()}
                                key='logout'
                                title='Logout'
                                icon={<ImportOutlined/>}/>
                        </Menu>
                    </Header>
                    <br/><br/><br/>
                    <Content theme={'light'}>

                        {this.renderSwitch(this.state.selected)}

                    </Content>
                    <Footer theme={'light'}>

                    </Footer>
                </Layout>

            </div>
        );
    }
}