import { Avatar, List } from "antd";
import { ProfileResponse } from "../../../pages/Types";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../repository/user.service";


export interface LikesProps {
    data?: string[];
}

export default function Likes({ data }: LikesProps) {

    const [datatest, setData] = useState<ProfileResponse[]>([]);
    const getUserList = async () => {
        const profiles: ProfileResponse[] = [];
        for (const userId of data!) {
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
