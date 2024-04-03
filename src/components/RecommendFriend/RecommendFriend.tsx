import { Avatar, List } from 'antd';
import React from 'react';
import './index.scss';

export interface RecommendFriendProps {
}

export default function RecommendFriend(props: RecommendFriendProps) {

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return (
        <div className='recommend__main'>
            Recommend friend
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<a href='#'>follow</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Recommend for you"
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}
