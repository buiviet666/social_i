import React from 'react';
import { Avatar, Divider, Input, List } from 'antd';

export interface SearchProps {
}

export function Search(props: SearchProps) {

    const { Search } = Input;
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
        <div>
            <h1>tìm kiếm</h1>
            <Search placeholder="input search loading with enterButton" loading enterButton />
            <Divider />
            <div>
                <div>
                    <h1>Lịch sử</h1>
                    <span>xóa tất cả</span>
                </div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
