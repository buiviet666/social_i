import { Avatar, List } from 'antd';
import { ProfileResponse } from '../../../pages/Types';
import './index.scss';
import { useEffect, useState } from 'react';
import { getUserProfile, updateFollowingProfile, updateFollowProfile } from '../../../repository/user.service';
import { useNavigate } from 'react-router-dom';

export interface IFollowProps {
    userInfo?: string[];
    userInfoAccMain?: ProfileResponse;
}

export default function Follow({ userInfo, userInfoAccMain }: IFollowProps) {

    console.log("thong tin: ", userInfo);
    const history = useNavigate();
    const [datatest, setData] = useState<ProfileResponse[]>([]);

    const uploadFollow = async (userInfo: ProfileResponse) => {

        if (userInfoAccMain?.userFollowing?.includes(userInfo.userId as never)) {
            userInfoAccMain.userFollowing.splice(userInfoAccMain.userFollowing.indexOf(userInfo.userId as never), 1);
            userInfo.userFollowers?.splice(userInfo.userFollowers.indexOf(userInfoAccMain.userId as never), 1);

            await updateFollowProfile(
                userInfo.id!,
                userInfo.userFollowers!,
            );

            await updateFollowingProfile(
                userInfoAccMain!.id!,
                userInfoAccMain!.userFollowing!,
            );
            window.location.reload();
        } else {
            userInfoAccMain?.userFollowing?.push(userInfo.userId as never);
            userInfo.userFollowers?.push(userInfoAccMain?.userId as never);

            await updateFollowProfile(
                userInfo.id!,
                userInfo.userFollowers!,
            );

            await updateFollowingProfile(
                userInfoAccMain!.id!,
                userInfoAccMain!.userFollowing!,
            );
            window.location.reload();
        }
    }

    const getUserList = async () => {
        const profiles: ProfileResponse[] = [];
        for (const userId of userInfo!) {
            const profile = await getUserProfile(userId);
            if (profile) {
                profiles.push(profile);
            }
        }
        setData(profiles);
    };

    const handleProfileClick = (userId: string) => {
        history("/profile", { state: { userId: userId } });
        window.location.reload();
    }

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div style={{ height: 600, overflow: 'auto' }} className='px-3'>
            <List
                dataSource={datatest}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photoURL} />}
                            title={<a onClick={() => handleProfileClick(item.userId as never)}>
                                <strong>{item.displayName}</strong>
                            </a>}
                            description={item.bio}
                        />
                        <a onClick={() => uploadFollow(item)}>
                            {userInfoAccMain?.userFollowing?.includes(item.userId as never) ? "unFollow" : "Follow"}
                        </a>

                    </List.Item>
                )}
            />
        </div>
    );
}
