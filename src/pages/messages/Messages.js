import React, { Component } from 'react';
import { List, Avatar,
        Button, message, Row,
        Col, Divider, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { auth, realTime, db } from "../../services/firebase";
import Chats from '../messages/Chats';

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

    }


    render(){
        return (
            <div>
                <Row justify='center'>
                    <Col span={6}>
                        {/*Chat Threads Container*/}
                        <br/>
                        <Row align='bottom'>
                            <Col span={8}>
                                <Avatar
                                    src={this.props.photo}
                                    size={64}/>
                            </Col>
                            <Col span={8}>
                                <b style={{fontSize:'20px'}}>Chat</b>
                            </Col>
                            <Col span={8}>
                                <Button
                                    icon={<SendOutlined/>}
                                    onClick={() => console.log('click')}/>
                            </Col>
                        </Row>
                        <Divider/>
                        <List
                            itemLayout='horizontal'
                            datasource={this.state.threads}
                            bordered={true}
                            renderItem={
                                item => (
                                    <List.Item>
                                       <List.Item.Meta
                                            title={item.title}
                                       />
                                    </List.Item>
                                )}>
                        </List>
                    </Col>
                    <Col span={1}/>
                    {/*Messages Container*/}
                    <Col span={13}>
                        <br/>
                        <Row align='bottom'>
                            <Col span={24}>
                                <List
                                    itemLayout='horizontal'
                                    bordered={true}
                                    renderItem={
                                        item => (
                                         <List.Item>
                                             <List.Item.Meta
                                                 title={item.title}
                                             />
                                         </List.Item>
                                        )}>
                                </List>
                            </Col>
                        </Row>
                        <Row align='bottom'>
                            <br/><br/>
                            <Col span={18}>
                                <Input placeholder='Type A Message'/>
                            </Col>
                            <Col span={4} justify='right'>
                                <Button
                                    type='primary'>
                                    Send
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>



            </div>

        );
    }


}