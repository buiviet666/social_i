import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImg from '../../../public/Devices-bro.svg';
import './index.scss';

export interface SigninProps {
}

export default function Signin(props: SigninProps) {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className='formSignin'>
            <div className='formSignin__container'>
                <div className='formSignin__main'>
                    <img src={BackgroundImg} alt='img' />
                </div>
                <div className='formSignin__main'>
                    <div className='formSignin__content'>
                        <div className='formSignin__title'>
                            <h3><strong>Greenland</strong> New member</h3>
                            <p>Hello due welcome to greenland we happy to see you ✨</p>
                        </div>
                        <Form
                            name="normal_login"
                            className="login-form "
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            style={{ width: '100%' }}>

                            <Form.Item
                                style={{ marginBottom: '30px' }}
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}>
                                <Input
                                    size="large"
                                    style={{ fontSize: '17px' }}
                                    prefix={<UserOutlined className="site-form-item-icon" style={{ paddingRight: '10px' }} />}
                                    placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '35px' }}
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input.Password
                                    size="large"
                                    style={{ fontSize: '17px' }}
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ paddingRight: '10px' }} />}
                                    type="password"
                                    placeholder="Password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '35px' }}
                                name="Confirm-password"
                                rules={[{ required: true, message: 'Please confirm your Password!' }]}>
                                <Input.Password
                                    size="large"
                                    style={{ fontSize: '17px' }}
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ paddingRight: '10px' }} />}
                                    type="password"
                                    placeholder="Confirm Password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            </Form.Item>

                            <Form.Item
                                className='btn-remember'
                                name="remember"
                                valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button btn-custom">Sign Up
                                </Button>
                            </Form.Item>
                            Already have an account? <Link to="/login" className='text-hover'>Login</Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
