import React, { Component } from 'react';
import { Modal } from 'antd';


export default class AvatarEditor extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Modal
                    title='Change Profile Pic'
                    visible={this.props.editAvatar}
                    >
                    <p> Some Content</p>
                </Modal>
            </div>
        );
    }
}