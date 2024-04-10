import { AntDesignOutlined, CommentOutlined, FlagOutlined, HeartOutlined, MoreOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Divider, Input, Space, Tooltip } from 'antd';
import React from 'react';
import './index.scss'

const Icons = ({ icon }: { icon: React.FunctionComponent }) => (
    <Space style={{ fontSize: '30px', padding: '8px' }}>
        {React.createElement(icon)}
    </Space>
)

export default function Post() {

    return (
        <div className='post__container'>
            <div className='post__main'>
                <div className='post__main__spaceBetween'>
                    <div style={{ marginRight: '16px' }}><Avatar icon={<AntDesignOutlined />} /></div>
                    <div className='post__main__container'>
                        <div><strong>name</strong></div>
                        <span style={{ margin: '0 4px' }}>•</span>
                        <div style={{ color: 'rgb(115, 115, 115)' }}>time</div>
                    </div>
                    <div>
                        <div><MoreOutlined /></div>
                    </div>
                </div>
                <img className='post__main__img' width={272} alt='img' src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                <div className='post__main__description'>
                    <div className='post__main__description__container'>
                        <div style={{ display: 'flex' }}>
                            <Icons icon={HeartOutlined} key="list-vertical-star-o" />
                            <Icons icon={CommentOutlined} key="list-vertical-like-o" />
                            <Icons icon={SendOutlined} key="list-vertical-message" />
                        </div>
                        <div className='post__main__description__container__save'><FlagOutlined /></div>
                    </div>
                    <div>
                        <strong>21 Likes</strong>
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex' }}>
                        <div style={{ marginRight: '4px' }}>
                            <strong>Name</strong>
                        </div>
                        <div>
                            Description
                        </div>
                    </div>
                    <div style={{ marginTop: '8px', color: 'rgba(0,0,0,.25)' }}>View comment...</div>
                    <div style={{ marginTop: '8px' }}>
                        <Input
                            placeholder="Input your comment !"
                            suffix={<Tooltip title="Extra information">
                                <SmileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                            </Tooltip>} />
                    </div>
                </div>
            </div>
            <Divider />
        </div>
    );
}
