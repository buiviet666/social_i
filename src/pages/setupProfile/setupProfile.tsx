// import React from 'react';

import { Content, Footer } from "antd/es/layout/layout";
import Layouts from "../../components/Layout/Layouts";
import { Avatar, Button, Form, Input, InputRef, Layout } from "antd";
import Footers from "../../components/Footers/Footers";
import './index.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FileEntry, ProfileInfo, userProfile } from "../Types";
import FileUploader from "../../components/FileUploader/FileUploader";
import { UserOutlined } from "@ant-design/icons";
import { createUserProfile, updateUserProfile } from "../../repository/user.service";
import { useUserAuth } from "../../context/UserAuthContext";
import { updateUserInfoOnPosts } from "../../repository/post.service";

export interface SetupProfileProps {
}

export default function SetupProfile() {
    // props: setupProfileProps

    const { user, updateProfileInfo } = useUserAuth();
    const history = useNavigate();
    const location = useLocation();
    const { id, userId, userBio, displayName, photoURL } = location.state;
    const inputRef = useRef<InputRef>(null);

    const [data, setData] = useState<userProfile>({
        userId,
        displayName,
        photoURL,
        userBio,
    });

    const [fileEntry, setFileEntry] = useState<FileEntry>({
        files: [],
    })

    const submitInfo = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                const response = await updateUserProfile(id, data);
                console.log("THe update is: ", response);

            } else {
                const reponse = await createUserProfile(data);
                console.log("The created is: ", reponse);

            }

            const profileInfo: ProfileInfo = {
                user: user!,
                displayName: data.displayName,
                photoURl: data.photoURL,
                userBio: data.userBio
            };

            updateProfileInfo(profileInfo);

            updateUserInfoOnPosts(profileInfo);

            history("/profile");
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current!.focus({
                cursor: 'end',
            });
        }
    }, []);

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

                                    {fileEntry.files.length > 0
                                        ? (<Avatar icon={<img src={fileEntry.files[0].cdnUrl!} />} />)
                                        : (<Avatar icon={<img src={data.photoURL ? data.photoURL : 'gi'} />} />)}

                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                        <strong>{data.displayName}</strong>
                                        <span>{data.userBio}</span>
                                    </div>
                                </div>
                                <div>
                                    <FileUploader
                                        fileEntry={fileEntry}
                                        onChange={setFileEntry}
                                    />
                                    <a>Change photo</a>
                                </div>
                            </div>
                        </div>
                        <Form
                            initialValues={data}
                            layout="vertical">
                            <Form.Item
                                label="Display Name"
                                name="Display Name">
                                <Input
                                    onChange={(e) => { setData({ ...data, displayName: e.target.value }) }}
                                    value={data.displayName}

                                    ref={inputRef}
                                    placeholder="input your name..." />
                            </Form.Item>

                            <Form.Item
                                label="Bio"
                                name="Bio">
                                <Input
                                    onChange={(e) => { setData({ ...data, userBio: e.target.value }) }}
                                    value={data.userBio}

                                    showCount
                                    maxLength={150}
                                    placeholder="input your bio..." />
                            </Form.Item>

                            <Form.Item
                                style={{ float: 'right' }}>
                                <Button
                                    className="btn_edit_profile"
                                    type="primary"
                                    htmlType="submit"
                                    onClick={submitInfo}>
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
