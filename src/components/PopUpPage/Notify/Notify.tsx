import { Avatar, Divider, List } from 'antd';
// import React from 'react';
import './index.scss';

export interface NotifyProps {

}

export function Notify() {
    // props: NotifyProps

    const data = [
        {
            title: 'Ant Design Title 1',
            descriptions: 'is follow you'
        },
        {
            title: 'Ant Design Title 2',
            descriptions: 'is use'
        },
        {
            title: 'Ant Design Title 3',
            descriptions: 'like your post'
        },
        {
            title: 'Ant Design Title 4',
            descriptions: 'is follow you'
        },
        {
            title: 'Ant Design Title 4',
            descriptions: 'is follow you'
        },
        {
            title: 'Ant Design Title 4',
            descriptions: 'is follow you'
        },
        {
            title: 'Ant Design Title 4',
            descriptions: 'is follow you'
        },
        {
            title: 'Ant Design Title 999',
            descriptions: 'is follow you'
        },
    ];

    return (
        <div className='popupNotify'>
            <div className='popupNotify__title'>
                <div>
                    <span><strong>Notify</strong></span>
                </div>
            </div>
            <div>
                <div className='popupNotify__content'>
                    <span><strong>News</strong></span>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{ padding: '8px 24px' }}
                            actions={[<a href='#' style={{ color: 'rgb(0, 149, 246)' }}>follow</a>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                // title={<a href="https://ant.design">{item.title}</a>}
                                description={<span><strong style={{ color: 'black' }}>{item.title}</strong> {item.descriptions}</span>}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <Divider />
            <div>
                <div className='popupNotify__content'>
                    <span><strong>Older</strong></span>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{ padding: '8px 24px' }}
                            actions={[<a href='#' style={{ color: 'rgb(0, 149, 246)' }}>follow</a>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design"
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}
