import React, { Component } from 'react';
import { Layout, Avatar, Button, Tooltip, Descriptions, Drawer } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import EditProfile from './EditProfile';
import './usrprofile.css';
import { auth } from 'firebase';

const { Header, Footer, Sider, Content } = Layout;

export default class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            profilePic: null,
            userName: null,
            profileDrawer: false
        }

        this.closeProfileEdit = this.closeProfileEdit.bind(this);
        this.openProfileEdit = this.openProfileEdit.bind(this);

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
    componentDidMount(){
        console.log(this.props.profile.photo);
    }



    render(){
        return(
            <Layout>

                <Layout>
                    <Sider theme={'light'}
                           style={{textAlign:'center'}}
                           width='25%'>
                        <br/>
                        <div>
                            <Avatar
                                icon={<UserOutlined/>}
                                size={150}
                                src={this.props.profile.photo}
                            />
                        </div>
                        <br/>
                        <div>
                            <Descriptions title={this.props.profile.name} layout='vertical'>
                                <Descriptions.Item label='User Name'>{this.props.profile.usrName}</Descriptions.Item>
                                <Descriptions.Item label='Country'>{this.props.profile.location}</Descriptions.Item>
                                <Descriptions.Item label='Skill Level'>{this.props.profile.skill}</Descriptions.Item>
                                <Descriptions.Item label='Posts'>{this.props.profile.posts.length}</Descriptions.Item>
                                <Descriptions.Item label='Following'>{this.props.profile.following}</Descriptions.Item>
                                <Descriptions.Item label='Followers'>{this.props.profile.followers}</Descriptions.Item>
                            </Descriptions>
                            <Button type='primary'
                                    onClick={this.openProfileEdit}>
                                Edit Profile
                            </Button>
                                <Drawer title={'Edit Profile'}
                                        width={'30%'}
                                        maskClosable={false}
                                        placement={'left'}
                                        onClose={this.closeProfileEdit}
                                        visible={this.state.profileDrawer}>
                                    <EditProfile/>
                                </Drawer>


                        </div>
                        <br/>
                    </Sider>
                    <Content>

                        <p>My Posts?</p>
                    </Content>
                    <Sider theme={'light'}>
                        My Grade distribution
                    </Sider>
                </Layout>

            </Layout>

        );
    }
}