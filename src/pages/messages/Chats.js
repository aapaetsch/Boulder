import React, { Component } from 'react';
import { Button, List, message } from 'antd';
import { auth, realTime} from "../../services/firebase";

export default class Chat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content:'',
            readError: null,
            writeError: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        this.setState({
            readError: null,
        });
        try{
            realTime.ref('chats/'+this.props.thread.toString()).on('value', snapshot =>{
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({chats});
            })
        } catch(error){
            this.setState({readError: error.message});
            message.error(error.message);
        }
    }

    handleChange(event){
        this.setState({
            content: event.target.value,
        });
    }

    async handleSubmit(event){
        event.preventDefault();
        this.setState({
            writeError: null,
        });
        try{
            await realTime.ref('chats/'+this.props.thread.toString()).push({
                message: this.state.content,
                from:  this.state.user.uid,
                to: this.props.receiverID,
                timestamp: Date.now()
            });
            this.setState({content: ''});
        } catch(error){
            this.setState({writeError: error.message});
            message.error(error.message);
        }
    }




    render(){
        return(
            <div>



            </div>
        );
    }


}