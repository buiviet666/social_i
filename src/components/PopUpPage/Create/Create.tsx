import { UploadOutlined } from '@ant-design/icons';
import { Button, Divider, message, Upload, UploadProps } from 'antd';
import React from 'react';

export interface CreateProps {
}

export function Create(props: CreateProps) {

    const updatePhoto: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div>
            <h1>tạo bài viết mới</h1>
            <Divider />
            <div>
                <Upload {...updatePhoto}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div>
        </div>
    );
}
