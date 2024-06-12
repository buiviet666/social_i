import { Avatar, List } from 'antd';
import './index.scss';
import { useUserAuth } from '../../context/UserAuthContext';
import { useEffect, useState } from 'react';
import { ProfileResponse } from '../../pages/Types';
import { getUserRecommend, updateFollowingProfile, updateFollowProfile } from '../../repository/user.service';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface RecommendFriendProps {
    dataAcc: ProfileResponse;
}

export default function RecommendFriend({ dataAcc }: RecommendFriendProps) {

    const { user } = useUserAuth();
    const history = useNavigate();
    const [recommend, setRecommend] = useState<ProfileResponse[]>([]);
    const [follow, setFollow] = useState<{
        isFollow?: boolean,
    }>({
        isFollow: dataAcc.userFollowing?.includes(dataAcc.userId as never) ? true : false,
    });

    const updateFollow = async (isVal: boolean, userFollower: ProfileResponse) => {
        console.log(isVal);
        console.log(userFollower);

        setFollow({
            isFollow: !follow.isFollow,
        });

        if (userFollower.userFollowers?.includes(dataAcc.userId as never)) {
            userFollower.userFollowers?.splice(userFollower.userFollowers?.indexOf(dataAcc.userId as never), 1);
            dataAcc.userFollowing?.splice(dataAcc.userFollowing?.indexOf(dataAcc as never), 1)

            await updateFollowProfile(
                userFollower.id!,
                userFollower.userFollowers!,
            );

            await updateFollowingProfile(
                dataAcc!.id!,
                dataAcc!.userFollowing!,
            );
        } else {
            userFollower.userFollowers?.push(dataAcc.userId as never);
            dataAcc?.userFollowing?.push(dataAcc.userId as never);

            await updateFollowProfile(
                userFollower.id!,
                userFollower.userFollowers!,
            );

            await updateFollowingProfile(
                dataAcc!.id!,
                dataAcc!.userFollowing!,
            );
        }
        window.location.reload();
    }

    const getListRecommend = async (userId: string) => {
        const response = (await getUserRecommend(userId)) || [];
        setRecommend(response);
    };

    const data = recommend.map((val) => val);


    useEffect(() => {
        if (user != null) {
            getListRecommend(user?.uid);
        }
    }, [user]);

    console.log("in ra thong tin ca nhan: ", dataAcc);
    console.log("in ra danh sach: ", data);


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
                        actions={[<a onClick={() => updateFollow(!follow.isFollow, item!)} style={{ color: 'rgb(0, 149, 246)' }}>follow</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photoURL ? item.photoURL : <Avatar icon={<UserOutlined />} />} />}
                            title={<a onClick={() => history("/profile", { state: { userId: item.userId } })}><strong>{item.displayName ? item.displayName : user?.email}</strong></a>}
                            description="Recommend for you" />
                    </List.Item>
                )}
            />
        </div>
    );
}
