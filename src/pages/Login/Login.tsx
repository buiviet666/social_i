import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

export interface LoginProps {
}

export default function Login(props: LoginProps) {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className='formLogin'>
            <div className='formLogin__container'>
                <div className='formLogin__main'>
                    <div className='formLogin__content'>
                        <div className='formLogin__title'>
                            <h3>Login <strong>Greenland</strong></h3>
                            <p>Welcome back my friend ✨</p>
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

                            <Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Form.Item
                                        className='btn-remember'
                                        name="remember"
                                        valuePropName="checked">
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <div style={{ marginBottom: '24px' }}>
                                        <a className="login-form-forgot text-hover" style={{ textDecoration: 'underline' }} href="">Forgot password</a>
                                    </div>
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button btn-custom">Log in
                                </Button>
                            </Form.Item>
                            Or <Link to="/signin" className='text-hover'>register now!</Link>
                        </Form>
                    </div>
                </div>
                <div className='formLogin__main'>
                    <img src="https://preview.colorlib.com/theme/bootstrap/login-form-08/images/undraw_file_sync_ot38.svg" alt='img' />
                </div>
            </div>
        </div>
    );
}
