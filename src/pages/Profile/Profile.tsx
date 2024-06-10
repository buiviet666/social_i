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
import { getPostByUserId, getPostLikes, getPostSave } from '../../repository/post.service';
import { getUserProfile } from '../../repository/user.service';

export default function Profile() {

    const { user } = useUserAuth();
    const [data, setData] = useState<DocumentResponse[]>([]);
    const [dataPostLikes, setDataPostLikes] = useState<DocumentResponse[]>([]);
    const [dataPostSave, setDataPostSave] = useState<DocumentResponse[]>([]);
    const history = useNavigate();
    const location = useLocation();
    const { userId } = location.state;

    const intialUserProfile: ProfileResponse = {
        id: "",
        userId: user?.uid,
        displayName: user?.displayName ? user?.displayName : user?.email,
        photoURL: user?.photoURL ? user.photoURL : "",
        bio: "",
        userFollowing: [],
        userFollowers: [],
    };
    const [userInfo, setUserInfo] = useState<ProfileResponse>(intialUserProfile);

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

    const getLikePosts = async (id: string) => {
        try {
            const querySnapShot = await getPostLikes(id);
            const tempArr: DocumentResponse[] = [];
            if (querySnapShot.size > 0) {
                querySnapShot.forEach((doc) => {
                    const data = doc.data() as Post;
                    const responseObj: DocumentResponse = {
                        id: doc.id,
                        ...data
                    }
                    tempArr.push(responseObj);
                });
                setDataPostLikes(tempArr);
            } else {
                console.log("No doc");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSavePosts = async (id: string) => {
        try {
            const querySnapShot = await getPostSave(id);
            const tempArr: DocumentResponse[] = [];
            if (querySnapShot.size > 0) {
                querySnapShot.forEach((doc) => {
                    const data = doc.data() as Post;
                    const responseObj: DocumentResponse = {
                        id: doc.id,
                        ...data
                    }
                    tempArr.push(responseObj);
                });
                setDataPostSave(tempArr);
            } else {
                console.log("No doc");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserInfo = async (userId: string) => {
        const dataProfile: ProfileResponse = (await getUserProfile(userId)) || {};
        if (dataProfile.displayName) {
            setUserInfo(dataProfile);
        }
    }

    const renderPosts = () => {
        return data.map((item) => {
            return (
                <div key={item.photos![0].uuid} className='tablePhotoProfile'>
                    <img className='tableImgProfile' src={`${item.photos![0].cdnUrl}`} />
                </div>
            )
        })
    }

    const renderPostsLike = () => {
        return dataPostLikes.map((itemsPost) => {
            return (
                <div key={itemsPost.photos![0].uuid} className='tablePhotoProfile'>
                    <img className='tableImgProfile' src={`${itemsPost.photos![0].cdnUrl}`} />
                </div>
            )
        })
    }

    const renderPostsSave = () => {
        return dataPostSave.map((itemsPost) => {
            return (
                <div key={itemsPost.photos![0].uuid} className='tablePhotoProfile'>
                    <img className='tableImgProfile' src={`${itemsPost.photos![0].cdnUrl}`} />
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
            children: dataPostSave
                ? <div className='tableContainerProfile'>
                    {renderPostsSave()}
                </div>
                : <div>
                    <span>nothing to post</span>
                </div>,
            icon: <FlagOutlined />,
        },
        {
            key: '3',
            label: 'likeds',
            children: dataPostLikes
                ? <div className='tableContainerProfile'>
                    {renderPostsLike()}
                </div>
                : <div>
                    <span>nothing to post</span>
                </div>,
            icon: <HeartOutlined />,
        }
    ];

    useEffect(() => {
        if (userId != null) {
            getAllPost(userId);
            getLikePosts(userId);
            getSavePosts(userId);
            getUserInfo(userId);
        }
    }, [userId]);

    console.log("in ra thong tin ca nhan: ", userInfo);


    return (
        <Layouts>
            <Content className='profile__main'>
                <Layout className='profile__main__container'>
                    <Header className='profile__main__header'>
                        <div className='profile__main__header__avatar'>
                            <div>
                                {userInfo.photoURL ? (
                                    <Avatar
                                        size={{ xs: 30, sm: 32, md: 40, lg: 64, xl: 80, xxl: 200 }}
                                        icon={<img src={userInfo.photoURL} />} />
                                ) : (
                                    <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 200 }}
                                        icon={<UserOutlined />} />
                                )}
                            </div>
                        </div>
                        <div className='profile__main__header__title'>
                            <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px' }}>
                                <div className='profile__fix'>
                                    <span>
                                        <strong>{userInfo.displayName}</strong>
                                    </span>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    {userInfo.userId === user?.uid ? (
                                        <>
                                            <div style={{ display: 'flex' }}>
                                                <div className='profile__fix profile_btn_fix'>
                                                    <span style={{ cursor: 'pointer' }} onClick={() => history("/setting", { state: userInfo })}>Edit profile</span>
                                                </div>
                                                <div className='profile__more'>
                                                    <SettingOutlined />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='profile__fix profile_btn_fix'>
                                                <span style={{ cursor: 'pointer' }}>Follow</span>
                                            </div>
                                            <div className='profile__fix profile_btn_fix'>
                                                <span style={{ cursor: 'pointer' }}>Inbox</span>
                                            </div>
                                            <div className='profile__more'>
                                                <MoreOutlined />
                                            </div>
                                        </>
                                    )}
                                </div>
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
                                <div>{userInfo.bio}</div>
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <div>
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
