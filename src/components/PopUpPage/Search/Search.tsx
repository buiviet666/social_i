import { useEffect, useState } from 'react';
import { Avatar, Divider, Input, List } from 'antd';
import './index.scss';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { ProfileResponse, userProfile } from '../../../pages/Types';
import { useNavigate } from 'react-router-dom';

export function Search() {

    const history = useNavigate();
    const [users, setUsers] = useState<ProfileResponse[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    const handleSearch = async (value: string) => {
        setSearchText(value);
    };

    useEffect(() => {
        if (searchText) {
            const fetchUsers = async () => {
                const q = query(collection(db, "user"));
                const querySnapShot = await getDocs(q);
                const result: ProfileResponse[] = [];
                if (querySnapShot.size > 0) {
                    querySnapShot.forEach((doc) => {
                        const data = doc.data() as userProfile;
                        if (data.displayName!.toLowerCase().includes(searchText.toLowerCase())) {
                            const responseObj: ProfileResponse = {
                                id: doc.id,
                                ...data,
                            };
                            result.push(responseObj);
                        }
                    });
                    setUsers(result);
                } else {
                    console.log("no doc");
                }
            };
            fetchUsers();
        } else {
            setUsers([]);
        }
    }, [searchText]);


    return (
        <div className='popupSearch__main'>
            <div className='popupSearch__title'>
                <div>
                    <span>
                        <strong>Search</strong>
                    </span>
                </div>
            </div>
            <div className='popupSearch__content'>
                <div className='popupSearch__content__input'>
                    <Input
                        placeholder="input search user"
                        variant="filled"
                        allowClear
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText} />
                </div>
                <Divider />
                <div className='popupSearch__content__data'>
                    <div className='popupSearch__content__data-text'>
                        {/* <span><strong>Recently</strong></span>
                        <span style={{ color: 'rgb(0, 149, 246)' }}><strong>Delete</strong></span> */}
                    </div>
                    <div style={{ margin: '8px 0' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={users}
                            renderItem={(item) => (
                                <List.Item
                                    style={{ padding: '8px 24px' }}
                                    actions={[<a href='#'>follow</a>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.photoURL} />}
                                        title={<a onClick={() => history("/profile", { state: { userId: item.userId } })}>{item.displayName}</a>}
                                        description={item.bio}
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
