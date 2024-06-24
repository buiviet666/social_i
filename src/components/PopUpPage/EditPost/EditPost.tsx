import { Avatar, Button, Carousel, Divider, Form, Input, InputRef } from 'antd';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { DocumentResponse, FileEntry } from '../../../pages/Types';
import FileUploader from '../../FileUploader/FileUploader';
import { AntDesignOutlined } from '@ant-design/icons';
import { useUserAuth } from '../../../context/UserAuthContext';
import { updatePost } from '../../../repository/post.service';

export interface EditPostProps {
    datapost: DocumentResponse;
}

export default function EditPost({ datapost }: EditPostProps) {

    const { user } = useUserAuth();
    const history = useNavigate();
    const inputRef = useRef<InputRef>(null);
    const [photoFileEntry, setPhotoFileEntry] = useState<FileEntry>({ files: [] });
    const [post, setPost] = useState<DocumentResponse>({
        id: datapost.id,
        date: new Date(),
        likes: datapost.likes ? datapost.likes : 0,
        photos: datapost.photos ? datapost.photos : [],
        userId: datapost.userId ? datapost.userId : "",
        caption: datapost.caption ? datapost.caption : "",
        userlikes: datapost.userlikes ? datapost.userlikes : [],
        usersave: datapost.usersave ? datapost.usersave : [],
        username: datapost.username ?? user?.email ?? "",
    });

    const submitPost = async () => {

        try {
            const response = await updatePost(post.id!, post);
            console.log("The update is: ", response);

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
    }, []);

    return (
        <div >
            <Form
                onFinish={submitPost}
                initialValues={post}>
                <div className='relative flex justify-center py-4'>
                    <div>
                        <span>
                            <strong>Edit Post</strong>
                        </span>
                    </div>
                    <Form.Item className='absolute right-0 top-0 py-2.5 m-0'>
                        <Button type="link" htmlType="submit">OK</Button>
                    </Form.Item>
                </div>
                <Divider className='m-0' />
                <div className='flex flex-row'>
                    <div style={{ width: '60%', borderRight: '1px solid rgba(5, 5, 5, 0.06)', height: '75vh' }}>
                        <FileUploader fileEntry={photoFileEntry} onChange={setPhotoFileEntry} preview={true} />
                        <Carousel
                            // arrows
                            infinite={false}>
                            {datapost.photos?.map((valueImg) => (
                                <div key={valueImg.uuid}>
                                    <img className='object-cover w-full' alt='img' src={valueImg ? valueImg.cdnUrl : ""} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div style={{ width: '40%' }}>
                        <div className='m-4'>
                            {user?.photoURL ? (
                                <Avatar icon={<img src={user.photoURL} />} />
                            ) : (
                                <Avatar icon={<AntDesignOutlined />} />
                            )}
                            <a onClick={() => history("/profile", { state: { userId: datapost.userId } })} className='ml-4'>
                                <strong>{post.username}</strong>
                            </a>
                        </div>

                        <div className='p-4'>
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
                    </div>
                </div>
            </Form>
        </div>
    );
}
