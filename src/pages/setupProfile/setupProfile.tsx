// import React from 'react';

import { Content, Footer } from "antd/es/layout/layout";
import Layouts from "../../components/Layout/Layouts";
import { Avatar, Button, Form, Input, Layout } from "antd";
import Footers from "../../components/Footers/Footers";
import './index.scss';

export interface setupProfileProps {
}

export default function setupProfile() {
    // props: setupProfileProps

    return (
        <Layouts>
            <Content className="setup__profile">
                <Layout>
                    <div className="setup__profile__container">
                        <div className="setup__profile__title">
                            <h2>Edit profile</h2>
                        </div>
                        <div className="setup__profile__avatar">
                            <div className="setup__profile__avatar__container">
                                <div style={{ display: 'flex' }}>
                                    <Avatar />
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                        <strong>Name</strong>
                                        <span>real name</span>
                                    </div>
                                </div>
                                <div>
                                    <a>Change photo</a>
                                </div>
                            </div>
                        </div>
                        <Form
                            layout="vertical">
                            <Form.Item
                                label="Display Name"
                                name="Display Name">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Bio"
                                name="Bio">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                style={{ float: 'right' }}>
                                <Button
                                    className="btn_edit_profile"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    ok
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Layout>
                <Footer className="edit__profile__main">
                    <Footers />
                </Footer>
            </Content>
        </Layouts>
    );
}
