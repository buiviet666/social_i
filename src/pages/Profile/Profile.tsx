import { AppstoreOutlined, FlagOutlined, HeartOutlined, MoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Tabs, TabsProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import Layouts from '../../components/Layout/Layouts';
import './index.scss'
import Footers from '../../components/Footers/Footers';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { DocumentResponse, Post, ProfileResponse } from '../Types';
import { getPostByUserId } from '../../repository/post.service';

export interface ProfileProps {
}

export default function Profile() {
    // props: ProfileProps

    const { user } = useUserAuth();
    const [data, setData] = useState<DocumentResponse[]>([]);
    const history = useNavigate();
    const location = useLocation();

    const { userId, displayName, photoURL } = location.state;

    const userInfo: ProfileResponse = {
        id: "",
        userId: user?.uid,
        displayName: user?.displayName ? user?.displayName : user?.email,
        photoURL: user?.photoURL ? user.photoURL : "",
        bio: "User bio...",
    }

    const getAllPost = async (id: string) => {
        try {
            const querySnapshot = await getPostByUserId(id);
            const tempArr: DocumentResponse[] = [];
            if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Post;
                    const responseObj: DocumentResponse = {
                        id: doc.id,
                        ...data
                    }
                    console.log("The response ob is: ", responseObj);
                    tempArr.push(responseObj);
                });
                setData(tempArr);
            } else {
                console.log("No doc");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderPosts = () => {
        return data.map((item) => {
            return (
                <div key={item.photos![0].uuid} className='tablePhotoProfile'>
                    <img className='tableImgProfile' src={`${item.photos![0].cdnUrl}`} />
                </div>
            )
        })
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Posts',
            children: data
                ? <div className='tableContainerProfile'>
                    {renderPosts()}
                </div>
                : <div>
                    <span>nothing to post</span>
                </div>,
            icon: <AppstoreOutlined />,
        },
        {
            key: '2',
            label: 'Saves',
            children: 'Content of Tab Pane 1',
            icon: <FlagOutlined />,
        },
        {
            key: '3',
            label: 'likeds',
            children: 'Content of Tab Pane 1',
            icon: <HeartOutlined />,
        }
    ];

    useEffect(() => {
        if (user != null) {
            getAllPost(user.uid);
        }
    }, [user]);

    console.log("user info: ", location);


    return (
        <Layouts>
            <Content className='profile__main'>
                <Layout className='profile__main__container'>
                    <Header className='profile__main__header'>
                        <div className='profile__main__header__avatar'>
                            <div>
                                {(userInfo.photoURL && userInfo.userId === location.state) || photoURL ? (
                                    <Avatar
                                        size={{ xs: 30, sm: 32, md: 40, lg: 64, xl: 80, xxl: 200 }}
                                        icon={<img src={userInfo.userId === location.state ? userInfo.photoURL : photoURL} />} />
                                ) : (
                                    <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 200 }}
                                        icon={<UserOutlined />} />
                                )}
                            </div>
                        </div>
                        <div className='profile__main__header__title'>
                            <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px' }}>
                                {userInfo.userId !== userId ? (
                                    <>
                                        <div className='profile__fix'>
                                            <span>
                                                <strong>{displayName}</strong>
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className='profile__fix profile_btn_fix'>
                                                <span style={{ cursor: 'pointer' }}>Follow</span>
                                            </div>
                                            <div className='profile__fix profile_btn_fix'>
                                                <span style={{ cursor: 'pointer' }}>Inbox</span>
                                            </div>

                                            <div className='profile__more'>
                                                <MoreOutlined />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='profile__fix'>
                                            <span>
                                                <strong>{userInfo.displayName}</strong>
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className='profile__fix profile_btn_fix'>
                                                <span style={{ cursor: 'pointer' }} onClick={() => history("/setting", { state: userInfo })}>Edit profile</span>
                                            </div>
                                            <div className='profile__more'>
                                                <SettingOutlined />
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>
                            <ul className='profile__info-data'>
                                <li>
                                    <span><strong>{data.length} </strong>Post</span>
                                </li>
                                <li>
                                    <span><strong>0 </strong>followers</span>
                                </li>
                                <li>
                                    <span><strong>0</strong> following</span>
                                </li>
                            </ul>
                            <div className='profile__info-display'>
                                {/* <div>{userInfo.bio}</div> */}
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <div>
                            {/* <div>
                                <Upload
                                    name="avatar"
                                    listType="picture-circle"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}>
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div> */}
                            <div>
                                <Tabs defaultActiveKey="1" items={items} centered />
                            </div>
                        </div>
                    </Content>
                </Layout>
                <Footer className='profile__footer__main'>
                    <Footers />
                </Footer>
            </Content >
        </Layouts >
    );
}
