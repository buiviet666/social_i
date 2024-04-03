import { AntDesignOutlined, CommentOutlined, FlagOutlined, HeartOutlined, MoreOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space } from 'antd';
import React from 'react';
import './index.scss'

export interface PostProps {
}

const Icon = ({ icon }: { icon: React.FunctionComponent }) => (
    <Space>
        {React.createElement(icon)}
    </Space>
)


export default function Post(props: PostProps) {

    return (
        <div className='post__container'>
            <div className='post__main'>
                <div className='post__main__spaceBetween'>
                    <div className='post__main__container'>
                        <div><Avatar icon={<AntDesignOutlined />} /></div>
                        <div>name</div>
                        <div>time</div>
                    </div>
                    <div>
                        <div><MoreOutlined /></div>
                    </div>
                </div>
                <img className='post__main__img' width={272} alt='img' src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                <div className='post__main__description'>
                    <div className='post__main__spaceBetween'>
                        <div>
                            <Icon icon={HeartOutlined} key="list-vertical-star-o" />
                            <Icon icon={CommentOutlined} key="list-vertical-like-o" />
                            <Icon icon={SendOutlined} key="list-vertical-message" />
                        </div>
                        <div><FlagOutlined /></div>
                    </div>
                    <div>
                        lượt thích
                    </div>
                    <div>tiêu đề bài</div>
                    <div>bình luận</div>
                </div>
            </div>
            <Divider />
        </div>
    );
}
