import React, { Component } from 'react';
import { List, Avatar, Layout, Button, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { auth, realTime, db } from "../../services/firebase";
import Chats from '../messages/Chats';
const {Header, Content, Sider} = Layout;

export default class Messages extends Component{
    constructor(props){
        super(props);
        this.state = {
            threads: [],
            user: auth().currentUser,
            readError: ''
        }
    }

    componentWillMount(){
        //get the chats
        let threads = this.props.profile.chatThreads;
        try{
            realTime.ref('chats').on('value', snapshot =>{
                let activeThreads = [];
                snapshot.forEach((snap) => {
                    if (snap.val() in threads){
                        activeThreads.push(snap.val().from);
                    }
                });
                this.setState({
                    threads: activeThreads,
                });
            });
        } catch(error){
            this.setState({
                readError: error.message,
            });
            message.error(error.message);
        }
    }


    render(){
        return (
            //user search bar //new chat

            //list of all threads, can be clicked on
            <Layout>
                <Sider theme='light'
                       width='25%'>
                    <div style={{display: 'inline-block'}}>
                        <br/>
                        <span>
                        <Avatar src={this.props.profile.photo} size={64}/>
                        <h2>&nbsp;&nbsp;Chat</h2>
                        <Button icon={<SendOutlined/>}
                                onClick={() => console.log('click')}/></span>
                    </div>
                    <List
                        itemLayout='horizontal'
                        dataSource={this.state.threads}
                        bordered={true}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}/>
                            </List.Item>
                        )}>

                    </List>
                </Sider>
                <Layout>
                <Header>

                </Header>
                <Content>
                    <Chats />

                </Content>
                </Layout>
            </Layout>

        );
    }


}