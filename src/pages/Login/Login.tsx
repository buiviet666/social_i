import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundLoginImg from '../../assets/login-bg.svg';
import { UserLogIn } from '../Types';
import { useUserAuth } from '../../context/UserAuthContext';
import { AnyObject } from 'antd/es/_util/type';

export interface LoginProps {
}

const initialValue: UserLogIn = {
    email: "",
    password: "",
}

export default function Login() {

    const { logIn } = useUserAuth();
    const navigate = useNavigate();
    const [userLogInfo, setUserLogInfo] = useState<UserLogIn>(initialValue);

    const handleSubmitDone = async () => {
        console.log("The user info is: ", userLogInfo);
        await logIn(userLogInfo.email, userLogInfo.password);
        navigate("/");
    }

    const handleSubmitFailed = async (error: AnyObject) => {
        console.log("Error: ", error);
    }

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
                            onFinish={handleSubmitDone}
                            onFinishFailed={handleSubmitFailed}
                            name="normal_login"
                            className="login-form "
                            initialValues={{ remember: true }}
                            style={{ width: '100%' }}>

                            <Form.Item
                                style={{ marginBottom: '30px' }}
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}>
                                <Input
                                    onChange={(e) => { setUserLogInfo({ ...userLogInfo, email: e.target.value }) }}
                                    value={userLogInfo.email}
                                    size="large"
                                    style={{ fontSize: '17px' }}
                                    prefix={<UserOutlined className="site-form-item-icon" style={{ paddingRight: '10px' }} />}
                                    placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '35px' }}
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input.Password
                                    onChange={(e) => { setUserLogInfo({ ...userLogInfo, password: e.target.value }) }}
                                    value={userLogInfo.password}
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
                    <img src={BackgroundLoginImg} alt='img' />
                </div>
            </div>
        </div>
    );
}
