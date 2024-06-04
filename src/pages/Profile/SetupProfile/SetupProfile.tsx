// import React from 'react';

import { Content, Footer } from "antd/es/layout/layout";
import Layouts from "../../../components/Layout/Layouts";
import { Avatar, Button, Form, Input, InputRef, Layout } from "antd";
import Footers from "../../../components/Footers/Footers";
import './index.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FileEntry, ProfileInfo, userProfile } from "../../Types";
import FileUploader from "../../../components/FileUploader/FileUploader";
import { UserOutlined } from "@ant-design/icons";
import { createUserProfile, updateUserProfile } from "../../../repository/user.service";
import { useUserAuth } from "../../../context/UserAuthContext";
import { updateUserInfoOnPosts } from "../../../repository/post.service";
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';


export default function SetupProfile() {
    // props: setupProfileProps

    const { user, updateProfileInfo } = useUserAuth();
    const history = useNavigate();
    const location = useLocation();
    const { id, userId, bio, displayName, photoURL } = location.state;
    const inputRef = useRef<InputRef>(null);

    const [data, setData] = useState<userProfile>({
        userId,
        displayName,
        photoURL,
        bio,
    });

    const [fileEntry, setFileEntry] = useState<FileEntry>({
        files: [],
    });

    const submitInfo = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                const response = await updateUserProfile(id, data);
                console.log("The update is: ", response);

            } else {
                const reponse = await createUserProfile(data);
                console.log("The created is: ", reponse);
            }

            const profileInfo: ProfileInfo = {
                user: user!,
                displayName: data.displayName,
                photoURl: data.photoURL,
            };

            updateProfileInfo(profileInfo);

            updateUserInfoOnPosts(profileInfo);
            console.log(profileInfo);


            history("/profile", { state: { userId: data.userId, displayName: data.displayName } });
            window.location.reload();
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

        if (fileEntry.files.length > 0) {
            setData({ ...data, photoURL: fileEntry.files[0].cdnUrl || "" })
        }
    }, [fileEntry]);

    console.log(location);


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
                                        ? (
                                            <Avatar icon={<img src={fileEntry.files[0].cdnUrl!} />} />
                                        ) : (
                                            data.photoURL
                                                ? (
                                                    <Avatar icon={<img src={data.photoURL} />} />
                                                ) : (
                                                    <UserOutlined />
                                                )
                                            // <Avatar icon={<img src={data.photoURL ? data.photoURL : 'ddd'} />} />
                                        )}

                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                        <strong>{user?.displayName}</strong>
                                        {/* <span>{data.bio}</span> */}
                                    </div>
                                </div>
                                <div>
                                    <FileUploader
                                        fileEntry={fileEntry}
                                        onChange={setFileEntry}
                                        preview={false}
                                    />
                                    <lr-config
                                        ctx-name="my-uploader"
                                        pubkey="71ae8ebb306291f26f62"
                                        multiple={false}
                                        confirmUpload={false}
                                        removeCopyright={true}
                                        imgOnly={true}>
                                    </lr-config>

                                    {/* khung chọn */}
                                    <lr-file-uploader-regular
                                        ctx-name="my-uploader"
                                        css-src={blocksStyles}>
                                    </lr-file-uploader-regular>
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

                            {/* <Form.Item
                                label="Bio"
                                name="Bio">
                                <Input
                                    onChange={(e) => { setData({ ...data, bio: e.target.value }) }}
                                    value={data.bio}

                                    showCount
                                    maxLength={150}
                                    placeholder="input your bio..." />
                            </Form.Item> */}

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
