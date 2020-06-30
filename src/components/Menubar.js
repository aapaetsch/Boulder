import {Avatar, Badge, Menu} from "antd";
import {auth} from "../services/firebase";
import React, { Component } from "react";
import { BellOutlined, UserOutlined, ImportOutlined, MessageOutlined} from '@ant-design/icons';


export default class MenuBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: null,
            usrName: null,
            photo: null,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.selected !== nextProps.selected ||
            this.state.usrName !== nextProps.usrName ||
            this.state.photo !== nextProps.photo;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState({
            selected: this.props.selected,
            usrName: this.props.usrName,
            photo: this.props.photo,
        });
    }


    render(){
        return (
          <div>
              <Menu
                  onClick={this.props.handleMenuClick}
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
                      <Avatar icon={<UserOutlined/>} src={this.state.photo}/>
                      &nbsp;{this.state.usrName}
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
          </div>
        );
    }
}