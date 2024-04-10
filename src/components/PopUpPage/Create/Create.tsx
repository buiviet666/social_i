import { Button, Divider, Form, Layout, Space } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
// import React, { useState } from 'react';
// import FileUploader from '../../FileUploader/FileUploader';
// import { useUserAuth } from '../../../context/UserAuthContext';
// import { FileEntry, Post } from '../../../pages/Types';
// import { UserOutlined } from '@ant-design/icons';

export interface CreateProps {
}

export function Create() {
    // props: CreateProps

    // const { user } = useUserAuth();
    // const [fileEntry, setFileEntry] = useState<FileEntry>({ files: [], })

    // const [post, setPost] = useState<Post>({
    //     // nameUser: user?.displayName,
    //     date: new Date(),
    //     likes: 0,
    //     photos: [],
    //     userId: null,
    //     caption: "",
    // })

    // const updatePhoto: UploadProps = {
    //     name: 'file',
    //     action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    //     headers: {
    //         authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //         if (info.file.status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully`);
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // };

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
    }

    const onFinish = (value: string) => {
        console.log('value from form: ', value);
    }

    // const normFile = (e: any) => {
    //     console.log('upload even: ', e);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e?.fileList
    // }

    return (
        <div>
            <h1>tạo bài viết mới</h1>
            <Divider />
            {/* <div>
                <Upload {...updatePhoto}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div> */}
            <Form
                name='validate_other'
                {...formItemLayout}
                onFinish={onFinish}
                style={{ maxWidth: 600 }}>
                <Layout>
                    <Content>
                        {/* <Form.Item
                            name="upload"
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="longgggggggggggggggggggggggggggggggggg"
                        >
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item> */}
                        <Form.Item
                            style={{ marginBottom: '30px' }}
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}>
                            {/* <Input
                                onChange={(e) => { setPost({ ...post, caption: e.target.value }) }}
                                value={post.caption}
                                size="large"
                                style={{ fontSize: '17px' }}
                                prefix={<UserOutlined className="site-form-item-icon" style={{ paddingRight: '10px' }} />}
                                placeholder="Viết chú thích..." /> */}
                        </Form.Item>
                        {/* <FileUploader fileEntry={fileEntry} onChange={setFileEntry} /> */}
                    </Content>
                    <Footer>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="reset">reset</Button>
                            </Space>
                        </Form.Item>
                    </Footer>
                </Layout>
            </Form>
        </div>
    );
}
