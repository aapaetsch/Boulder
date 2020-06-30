import React, { Component } from 'react';
import { message, Row, Col } from 'antd';
import { auth } from '../services/firebase';
import {getUser, createUser, updateUserProfile} from '../services/firestore';
import ProfilePage from "./usrprofile/ProfilePage";
import Messages from "./messages/Messages";
import MenuBar from "../components/Menubar";

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: 'profile',

            name: 'null',
            usrName: 'null',
            location: 'unknown',
            creationDate: 'null',
            followers: [],
            following: [],
            photo: 'null',
            skill: 'null',
            posts: [],

        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.editUserProfile = this.editUserProfile.bind(this);
    }

    handleMenuClick = e =>{
        console.log('click', e);
        this.setState({
            selected: e.key
        });
    }

    componentDidMount(){
        this.loadUser(auth().currentUser.uid)
            .then((result) => {if (result === false){auth().signOut()}});
    }

    async editUserProfile(values){
        if (values.skill !== this.state.skill ||
            values.location !== this.state.location ||
            values.usrName !== this.state.usrName ||
            values.name !== this.state.name) {
            const didUpdate = await updateUserProfile(values, auth().currentUser.uid);
            if (didUpdate) {
                this.setState({
                    skill: values.skill,
                    usrName: values.usrName,
                    location: values.location,
                    name: values.name,
                });
                message.success('Successfully updated account.');
                return false;
            } else {
                message.error('Error updating account.');
                return true;
            }
        }
    }

    async loadUser(uid) {
        console.log('names');
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
                await this.setUserProfile(user);
                return true;
            }
        } else {
            //If the user exists
            console.log('user found', user);
            message.success( 'Logged in as '+ user.usrName);
            await this.setUserProfile(user);
            return true;
        }
    }

    async setUserProfile(user){
        await this.setState({
            name: user.name,
            usrName: user.usrName,
            location: user.location,
            creationDate: user.creationDate,
            followers: user.followers,
            following: user.following,
            photo: user.photo,
            skill: user.skill,
            posts: user.posts,
        });
    }

    renderSwitch(content){
        switch (content){
            case 'profile':
                return <ProfilePage
                    myProfile={true}
                    name={this.state.name}
                    usrName={this.state.usrName}
                    skill={this.state.skill}
                    photo={this.state.photo}
                    location={this.state.location}
                    followers={this.state.followers}
                    following={this.state.following}
                    posts={this.state.posts}
                    creationDate={this.state.creationDate}
                    editUserProfile={this.editUserProfile}
                    />;
            case 'messages':
                return <Messages photo={this.state.photo}/>;
            default:
                return <p>hello world!</p>;
        }
    }



    render(){
        return (
            <div>
                {/*menu Bar*/}
                <Row justify="center">
                    <Col span={20}>
                        <MenuBar
                            photo={this.state.photo}
                            usrName={this.state.usrName}
                            selected={this.state.selected}
                            handleMenuClick={this.handleMenuClick}/>
                    </Col>
                </Row>
                {/*Main Content*/}
                <Row>
                    <Col span={24}>
                        {this.renderSwitch(this.state.selected)}
                    </Col>
                </Row>
                {/*Footer Content*/}
                <Row>

                </Row>
            </div>
        );
    }
}