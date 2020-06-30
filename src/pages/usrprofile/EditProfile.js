import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

export default class EditProfile extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }


     onFinish = async (values) => {
        console.log('values', values);
        await this.props.editUserProfile(values);
        this.props.closeProfileEdit();
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
                  <Form.Item initialValue={this.props.name} name='name' label='Name' >
                      <Input />
                  </Form.Item>
                  <Form.Item initialValue={this.props.usrName} name='usrName' label='User Name'>
                        <Input />
                  </Form.Item>
                  <Form.Item initialValue={this.props.location} name='location' label='Country'>
                      <Input />
                  </Form.Item>
                  <Form.Item initialValue={this.props.skill} name='skill' label='Skill Level'>
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
                  {/*<Form.Item*/}
                  {/*    name='emailItem'*/}
                  {/*    label='Email Address'*/}
                  {/*    rules={[{type:'email', message:'The input is not a valid Email Address.'}]}*/}
                  {/*    initialValue={this.state.email}>*/}
                  {/*    <Input />*/}
                  {/*</Form.Item>*/}
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

