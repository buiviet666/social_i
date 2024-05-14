import { Avatar, List } from 'antd';
// import React from 'react';
import './index.scss';
import { useUserAuth } from '../../context/UserAuthContext';
import { useEffect, useState } from 'react';
import { ProfileResponse } from '../../pages/Types';
import { getAllUser } from '../../repository/user.service';
import { UserOutlined } from '@ant-design/icons';

export interface RecommendFriendProps {
}

export default function RecommendFriend() {
    // props: RecommendFriendProps

    const { user } = useUserAuth();
    const [recommend, setRecommend] = useState<ProfileResponse[]>([]);
    const getListRecommend = async (userId: string) => {
        const response = (await getAllUser(userId)) || [];

        console.log("response is: ", response);

        setRecommend(response);
    };

    const data = recommend.map((val) => val);

    useEffect(() => {
        if (user?.uid != null) {
            getListRecommend(user.uid);
        }
    }, []);

    return (
        <div className='recommend__main'>
            <span className='recommend__main__title'><strong>Recommend friend</strong></span>
            <List
                style={{ padding: '8px 0' }}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        actions={[<a href='#' style={{ color: 'rgb(0, 149, 246)' }}>follow</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photoURL ? item.photoURL : <Avatar icon={<UserOutlined />} />} />}
                            title={<a href="https://ant.design"><strong>{item.displayName ? item.displayName : user?.email}</strong></a>}
                            description="Recommend for you" />
                    </List.Item>
                )}
            />
        </div>
    );
}
