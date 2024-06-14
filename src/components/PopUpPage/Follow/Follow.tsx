import { Avatar, List } from 'antd';
import { ProfileResponse } from '../../../pages/Types';
import './index.scss';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../../repository/user.service';

export interface IFollowProps {
    userInfo?: string[];
}

export default function Follow({ userInfo }: IFollowProps) {

    console.log("thong tin: ", userInfo);
    const [datatest, setData] = useState<ProfileResponse[]>([]);
    const getUserList = async () => {
        const profiles: ProfileResponse[] = [];
        for (const userId of userInfo!) {
            const profile = await getUserProfile(userId);
            if (profile) {
                profiles.push(profile);
            }
        }
        setData(profiles);
    }

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div style={{ height: 400, overflow: 'auto' }}>
            <List
                dataSource={datatest}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photoURL} />}
                            title={<a href="https://ant.design">{item.displayName}</a>}
                            description={item.bio}
                        />
                        <div>Content</div>
                    </List.Item>
                )}
            />
        </div>
    );
}
