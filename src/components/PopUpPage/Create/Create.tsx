import { Avatar, Button, Divider, Form, Input, InputRef } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import FileUploader from '../../FileUploader/FileUploader';
import { AntDesignOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { FileEntry, PhotoMeta, Post } from '../../../pages/Types';
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import { useUserAuth } from '../../../context/UserAuthContext';
import { createPost } from '../../../repository/post.service';
import { useNavigate } from 'react-router-dom';

export interface CreateProps {
}

export function Create() {
    // props: CreateProps

    const { user } = useUserAuth();
    const navigate = useNavigate();
    const inputRef = useRef<InputRef>(null);
    const [photoFileEntry, setPhotoFileEntry] = useState<FileEntry>({ files: [] });
    const [post, setPost] = useState<Post>({
        date: new Date(),
        likes: 0,
        photos: [],
        userId: "",
        caption: "",
        userlikes: [],
    });

    const submitPost = async () => {
        const photoMeta: PhotoMeta[] = photoFileEntry.files.map((file) => {
            return {
                cdnUrl: file.cdnUrl!,
                uuid: file.uuid!,
            }
        });

        if (user != null) {
            const newPost: Post = {
                ...post,
                userId: user?.uid || null,
                photos: photoMeta,
                username: user.displayName!,
                photoURL: user.photoURL!,
                emailUser: user.email!,
            };
            console.log("finall: ", newPost);
            await createPost(newPost);

            navigate("/");
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current!.focus({
                cursor: 'end',
            });
        }
    }, []);


    console.log(photoFileEntry);

    return (
        <div className='create'>
            <Form
                onFinish={submitPost}
                initialValues={post}>
                <div className='create__option'>
                    {/* <div>
                        <span style={{ padding: '4px 15px', color: 'red', cursor: 'pointer' }}>Close</span>
                    </div> */}
                    <div className='create__title'>
                        <span><strong>Create New Post</strong></span>
                    </div>
                    <Form.Item
                        style={{ margin: 0 }}>
                        <Button type="link" htmlType="submit">Post</Button>
                    </Form.Item>
                </div>
                <Divider />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='create__content'>
                        {photoFileEntry.files?.length === 0 ?

                            <div>hhhhhhh</div>
                            : <Form.Item
                                name="upload"
                                style={{ marginBottom: '0' }}
                            // rules={[{ required: true, message: 'Please input your photo' }]}
                            >
                                <FileUploader fileEntry={photoFileEntry} onChange={setPhotoFileEntry} />
                            </Form.Item>
                        }



                    </div>
                    <div className='create__description'>
                        <div style={{ margin: '16px' }}>
                            <Avatar icon={<AntDesignOutlined />} />
                            <span style={{ marginLeft: '12px' }}><strong>{user?.displayName ? user.displayName : user?.email}</strong></span>
                        </div>
                        <div style={{ padding: '0 16px', border: 'unset' }}>
                            <Form.Item
                                name="description"
                                rules={[{ required: true, message: 'Please input your description' }]}>
                                <Input.TextArea
                                    ref={inputRef}
                                    onChange={(e) => { setPost({ ...post, caption: e.target.value }) }}
                                    value={post.caption}
                                    showCount
                                    maxLength={2100}
                                    placeholder="Description..."
                                    style={{ height: 168, resize: 'none', border: 'unset', fontSize: '16px', marginBottom: '40px' }}
                                />
                            </Form.Item>
                        </div>
                        <div className='create__content__upload'>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CloudUploadOutlined />
                                <span style={{ marginTop: '16px', marginBottom: '6px' }}>Pick your picture</span>

                                {/* chức năng của khung chọn */}
                                <lr-config
                                    ctx-name="my-uploader"
                                    pubkey="71ae8ebb306291f26f62"
                                    multiple={true}
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
                </div>
            </Form>
        </div>
    );
}
