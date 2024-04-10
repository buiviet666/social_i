import React from 'react';
import { Avatar, Divider, Input, List } from 'antd';
import './index.scss';
import { CloseOutlined } from '@ant-design/icons';

export interface SearchProps {
}

export function Search() {
    // props: SearchProps

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
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 999',
        },
    ];

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e);
    };

    return (
        <div className='popupSearch__main'>
            <div className='popupSearch__title'>
                <div>
                    <span><strong>Search</strong></span>
                </div>
            </div>
            <div className='popupSearch__content'>
                <div className='popupSearch__content__input'>
                    <Search placeholder="input search loading with enterButton" loading enterButton allowClear onChange={onChange} />
                </div>
                <Divider />
                <div className='popupSearch__content__data'>
                    <div className='popupSearch__content__data-text'>
                        <span><strong>Recently</strong></span>
                        <span style={{ color: 'rgb(0, 149, 246)' }}><strong>Delete</strong></span>
                    </div>
                    <div style={{ margin: '8px 0' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item
                                    style={{ padding: '8px 24px' }}
                                    actions={[<a href='#'><CloseOutlined /></a>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Real name"
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
