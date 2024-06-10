import { Avatar, List } from 'antd';
import './index.scss';
import { useUserAuth } from '../../context/UserAuthContext';
import { useEffect, useState } from 'react';
import { ProfileResponse } from '../../pages/Types';
import { getUserRecommend } from '../../repository/user.service';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface RecommendFriendProps {
    dataUser: ProfileResponse[];
}

export default function RecommendFriend({ dataUser }: RecommendFriendProps) {

    const { user } = useUserAuth();
    const history = useNavigate();
    const [recommend, setRecommend] = useState<ProfileResponse[]>([]);


    const getListRecommend = async (userId: string) => {
        const response = (await getUserRecommend(userId)) || [];
        // console.log(response);

        setRecommend(response);
    };

    const data = recommend.map((val) => val);

    // const [followers, setFollowers] = useState<{
    //     follow: string,
    //     isFollow: boolean,
    // }>({
    //     follow: 'following',
    //     isFollow: ,
    // });

    useEffect(() => {
        if (user != null) {
            getListRecommend(user?.uid);
        }
    }, [user]);

    console.log("in ra recommend: ", dataUser);


    return (
        <div className='recommend__main'>
            <span className='recommend__main__title'>
                <strong>Recommend friend</strong>
            </span>
            <List
                style={{ padding: '8px 0' }}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        actions={[<a href='#' style={{ color: 'rgb(0, 149, 246)' }}>follow</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photoURL ? item.photoURL : <Avatar icon={<UserOutlined />} />} />}
                            title={<a onClick={() => history("/profile", { state: { id: item.id, userId: item.userId, displayName: item.displayName, photoURL: item.photoURL } })}><strong>{item.displayName ? item.displayName : user?.email}</strong></a>}
                            description="Recommend for you" />
                    </List.Item>
                )}
            />
        </div>
    );
}
