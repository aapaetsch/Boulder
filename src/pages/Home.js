import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Content} = Layout;

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick = e =>{
        console.log('click', e);
        this.setState({
            selected: e.key
        })
    }


    render(){
        
        return (
            <div>
                <Layout>
                    <Header>

                    </Header>
                    <Content>

                    </Content>
                    <Footer>

                    </Footer>
                </Layout>

            </div>
        );
    }
}