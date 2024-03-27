import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundImg from '../../../public/Devices-bro.svg';
import './index.scss';
import { UserSignIn } from '../Types';
import { useUserAuth } from '../../context/UserAuthContext';

export interface SigninProps {
}

const initialValue: UserSignIn = {
    email: "",
    password: "",
    confirmPassword: "",
}

export default function Signin() {

    const { signIn } = useUserAuth();
    const navigate = useNavigate();
    const [userInfor, setUserInfo] = useState<UserSignIn>(initialValue);

    const handleSubmitSignin = async () => {
        try {
            console.log("The user info is: ", userInfor);
            await signIn(userInfor.email, userInfor.password);
            navigate("/");
        } catch (error) {
            console.log("Error: ", error);
        }
    }

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
                            style={{ width: '100%' }}>

                            <Form.Item
                                style={{ marginBottom: '30px' }}
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}>
                                <Input
                                    onChange={(e) => { setUserInfo({ ...userInfor, email: e.target.value }) }}
                                    value={userInfor.email}
                                    size="large"
                                    style={{ fontSize: '17px' }}
                                    prefix={<UserOutlined className="site-form-item-icon" style={{ paddingRight: '10px' }} />}
                                    placeholder="Username & email" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '35px' }}
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input.Password
                                    onChange={(e) => { setUserInfo({ ...userInfor, password: e.target.value }) }}
                                    value={userInfor.password}
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
                                    onChange={(e) => { setUserInfo({ ...userInfor, confirmPassword: e.target.value }) }}
                                    value={userInfor.confirmPassword}
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
                                    onClick={handleSubmitSignin}
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
