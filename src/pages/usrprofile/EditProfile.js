import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UId: null,
            name: ['john', 'doe'],
            displayName: '123',
            skill: 'V0 - V1',
            location: 'Canada',
            email: '',
        }
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish = values => {
        console.log('values', values);
    }


    render() {
        const formLayout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        return (
          <div>
              <Form {...formLayout}
                    onFinish={this.onFinish}>
                  <Form.Item initialValue={this.state.name[0]} name='firstName' label='First Name' >
                      <Input />
                  </Form.Item>
                  <Form.Item initialValue={this.state.name[1]} name='lastName' label='Last Name' >
                      <Input />
                  </Form.Item>
                  <Form.Item initialValue={this.state.displayName} name='displayName' label='Display Name'>
                        <Input />
                  </Form.Item>
                  <Form.Item initialValue={this.state.location} name='location' label='Country'>
                      <Input />
                  </Form.Item>
                  <Form.Item initialValue={this.state.skill} name='skill' label='Skill Level'>
                        <Select style={{width: 120}}>
                            <Option value='V0 - V1'>V0 - V1</Option>
                            <Option value='V2 - V3'>V2 - V3</Option>
                            <Option value='V4 - V5'>V4 - V5</Option>
                            <Option value='V6 - V7'>V6 - V7</Option>
                            <Option value='V8 - V9'>V8 - V9</Option>
                            <Option value='V10 - V11'>V10 - V11</Option>
                            <Option value='V12+'>V12+</Option>
                        </Select>
                  </Form.Item>
                  <Form.Item
                      name='emailItem'
                      label='Email Address'
                      rules={[{type:'email', message:'The input is not a valid Email Address.'}]}
                      initialValue={this.state.email}>
                      <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{...formLayout.wrapperCol, offset: 8}}>
                      <Button type='primary' htmlType='submit'>
                          Submit
                      </Button>
                  </Form.Item>
              </Form>

          </div>
        );
    }
};

