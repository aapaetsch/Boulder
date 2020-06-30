import React, { Component } from 'react';
import { Layout, Avatar, Button,
        Tooltip, Descriptions, Drawer,
        Row, Col, Divider, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import EditProfile from './EditProfile';
import './usrprofile.css';
import { auth } from 'firebase';
import AvatarEditor from "../../components/AvatarEditor";

export default class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            profilePic: null,
            userName: null,
            profileDrawer: false,
            editAvatar: false,
        }

        this.closeProfileEdit = this.closeProfileEdit.bind(this);
        this.openProfileEdit = this.openProfileEdit.bind(this);
        this.openAvatar = this.openAvatar.bind(this);
        this.closeAvatar = this.closeAvatar.bind(this);
    }

    closeProfileEdit = () => {
        this.setState({
            profileDrawer: false
        });
    }

    openProfileEdit = () => {
        this.setState({
            profileDrawer: true
        });
    }

    openAvatar = () => {
        this.setState({
            editAvatar: true,
        });
    }

    closeAvatar = () => {
        this.setState({
            editAvatar: false,
        });
    }

    render(){
        return(
            <div>
                {/*User Profile Row*/}
                <Divider orientation="left"/>
                <Row justify="center">
                    <Col span={4}>
                        <Tooltip placement="bottom" title="Click to Edit">

                                <Avatar
                                    icon={<UserOutlined/>}
                                    size={100}
                                    src={this.props.photo}
                                    onClick={this.openAvatar}
                                >
                                </Avatar>
                        </Tooltip>
                        <AvatarEditor editAvatar={this.state.editAvatar}/>
                            <br/>
                        <b style={{fontSize: '18px'}}>{this.props.name}</b>

                    </Col>
                    <Col span={14}>
                        <br/><br/><br/>
                        <Descriptions layout='horizontal' size='small'>
                            <Descriptions.Item label='User Name'>{this.props.usrName}</Descriptions.Item>
                            <Descriptions.Item label='Country'>{this.props.location}</Descriptions.Item>
                            <Descriptions.Item label='Grade'>{this.props.skill}</Descriptions.Item>
                            <Descriptions.Item label='Posts'>{this.props.posts.length}</Descriptions.Item>
                            <Descriptions.Item label='Following'>{this.props.following.length}</Descriptions.Item>
                            <Descriptions.Item label='Followers'>{this.props.followers.length}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    {this.props.myProfile
                        ? (<Col span={4}>
                            <br/>
                            <Button
                                type="primary"
                                onClick={this.openProfileEdit}>
                                Edit Profile
                            </Button>
                            <br/><br/>
                            <Button
                                type="primary"
                                disabled>
                                Edit Account
                            </Button>
                            <Drawer
                                title="Edit Profile"
                                width="30%"
                                maskClosable={false}
                                placement="right"
                                onClose={this.closeProfileEdit}
                                visible={this.state.profileDrawer}>
                                <EditProfile
                                    name={this.props.name}
                                    usrName={this.props.usrName}
                                    skill={this.props.skill}
                                    photo={this.props.photo}
                                    location={this.props.location}
                                    closeProfileEdit={this.closeProfileEdit}
                                    editUserProfile={this.props.editUserProfile}/>
                            </Drawer>
                        </Col>)
                        : (<Col span={0}/>)
                    }
                </Row>
                <Row>

                </Row>
            </div>

        );
    }
}