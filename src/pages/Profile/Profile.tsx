import { AppstoreOutlined, FlagOutlined, HeartOutlined, MoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Modal, Tabs, TabsProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import Layouts from '../../components/Layout/Layouts';
import './index.scss'
import Footers from '../../components/Footers/Footers';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { DocumentResponse, Post, ProfileResponse } from '../Types';
import { getPostByUserId, getPostLikes, getPostSave } from '../../repository/post.service';
import { getUserProfile, updateFollowingProfile, updateFollowProfile } from '../../repository/user.service';
import Follow from '../../components/PopUpPage/Follow/Follow';
import PostEach from '../../components/PopUpPage/PostEach/PostEach';

export default function Profile() {

    const { user } = useUserAuth();
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);
    const [openPost, setOpenPost] = useState(false);
    const [data, setData] = useState<DocumentResponse[]>([]);
    const [dataPostLikes, setDataPostLikes] = useState<DocumentResponse[]>([]);
    const [dataPostSave, setDataPostSave] = useState<DocumentResponse[]>([]);
    const history = useNavigate();
    const location = useLocation();
    const { userId } = location.state;

    const intialUserProfile: ProfileResponse = {
        id: "",
        userId: userId,
        displayName: "",
        photoURL: "",
        bio: "",
    };

    const [userProfileAcc, setUserProfileAcc] = useState<ProfileResponse>(intialUserProfile);
    const [userInfo, setUserInfo] = useState<ProfileResponse>(intialUserProfile);
    const [follow, setFollow] = useState<{
        isFollow?: boolean,
    }>({
        isFollow: userInfo.userFollowers?.includes(user?.uid as never) ? true : false,
    });

    const updateFollow = async (isVal: boolean) => {
        setFollow({
            isFollow: !follow.isFollow,
        });
        console.log(isVal);

        if (userInfo.userFollowers?.includes(user?.uid as never)) {
            userInfo.userFollowers?.splice(userInfo.userFollowers?.indexOf(user?.uid as never), 1);
            userProfileAcc?.userFollowing?.splice(userProfileAcc.userFollowing?.indexOf(userInfo.userId as never), 1)

            await updateFollowProfile(
                userInfo.id!,
                userInfo.userFollowers!,
            );

            await updateFollowingProfile(
                userProfileAcc!.id!,
                userProfileAcc!.userFollowing!,
            );
        } else {
            userInfo.userFollowers?.push(user?.uid as never);
            userProfileAcc?.userFollowing?.push(userInfo.userId as never);

            await updateFollowProfile(
                userInfo.id!,
                userInfo.userFollowers!,
            );

            await updateFollowingProfile(
                userProfileAcc!.id!,
                userProfileAcc!.userFollowing!,
            );
        }
    };

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

    const getUserProfileAcc = async (userId: string) => {
        const getData: ProfileResponse = (await getUserProfile(userId)) || {};
        if (getData.displayName) {
            setUserProfileAcc(getData);
        }
    }

    const [selectedItem, setSelectedItem] = useState<DocumentResponse>();

    const handleClick = (itemPost: DocumentResponse) => {
        console.log(itemPost);
        setSelectedItem(itemPost);
        setOpenPost(true)
    }

    const renderPosts = () => {
        return data.map((item) => {
            return (
                <div key={item.photos![0].uuid} className='tablePhotoProfile'>
                    <img className='tableImgProfile cursor-pointer' src={`${item.photos![0].cdnUrl}`} onClick={() => handleClick(item)} />
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
            getUserProfileAcc(user?.uid as never);
        }
    }, []);

    // console.log("in ra thong tin acc chinh: ", userProfileAcc);
    // console.log("in ra thong tin: ", userInfo);
    // console.log("in ra thong tin bai viet: ", data);
    // console.log("in ra thu vua lay dc: ", selectedItem);



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
                                <div className='flex'>
                                    {userInfo.userId === user?.uid ? (
                                        <>
                                            <div className='flex'>
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
                                            <div className='profile__fix profile_btn_fix' onClick={() => updateFollow(!follow.isFollow)}>
                                                <span style={{ cursor: 'pointer' }}>
                                                    {userInfo.userFollowers?.includes(userProfileAcc?.userId as never) ? 'unfollow' : 'follow'}
                                                </span>
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
                                {userProfileAcc?.userId === userInfo.userId ? (
                                    <>
                                        <li>
                                            <span><strong>{data?.length} </strong>Post</span>
                                        </li>
                                        <li>
                                            <a className='cursor-pointer' onClick={() => setOpenFollowers(true)}>
                                                <strong>{userProfileAcc?.userFollowers?.length} </strong>followers
                                            </a>
                                            <Modal
                                                title="followers"
                                                centered
                                                open={openFollowers}
                                                footer={null}
                                                onOk={() => setOpenFollowers(false)}
                                                onCancel={() => setOpenFollowers(false)}
                                                cancelButtonProps={{ style: { display: 'none' } }}
                                                okButtonProps={{ style: { display: 'none' } }}>
                                                <Follow userInfo={userInfo.userFollowers} userInfoAccMain={userProfileAcc} />
                                            </Modal>
                                        </li>
                                        <li>
                                            <a className='cursor-pointer' onClick={() => setOpenFollowing(true)}>
                                                <strong>{userProfileAcc?.userFollowing?.length}</strong> following
                                            </a>
                                            <Modal
                                                title="following"
                                                centered
                                                open={openFollowing}
                                                footer={null}
                                                onOk={() => setOpenFollowing(false)}
                                                onCancel={() => setOpenFollowing(false)}
                                                cancelButtonProps={{ style: { display: 'none' } }}
                                                okButtonProps={{ style: { display: 'none' } }}>
                                                <Follow userInfo={userInfo.userFollowing} userInfoAccMain={userProfileAcc} />
                                            </Modal>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <span><strong>{data.length} </strong>Post</span>
                                        </li>
                                        <li>
                                            <span onClick={() => setOpenFollowers(true)}>
                                                <strong>{userInfo.userFollowers?.length} </strong>followers
                                            </span>
                                            <Modal
                                                title="Likes"
                                                centered
                                                open={openFollowers}
                                                footer={null}
                                                onOk={() => setOpenFollowers(false)}
                                                onCancel={() => setOpenFollowers(false)}
                                                cancelButtonProps={{ style: { display: 'none' } }}
                                                okButtonProps={{ style: { display: 'none' } }}>
                                                <Follow userInfo={userInfo.userFollowers} userInfoAccMain={userProfileAcc} />
                                            </Modal>
                                        </li>
                                        <li>
                                            <span onClick={() => setOpenFollowing(true)}>
                                                <strong>{userInfo.userFollowing?.length}</strong> following
                                            </span>
                                            <Modal
                                                title="Likes"
                                                centered
                                                open={openFollowing}
                                                footer={null}
                                                onOk={() => setOpenFollowing(false)}
                                                onCancel={() => setOpenFollowing(false)}
                                                cancelButtonProps={{ style: { display: 'none' } }}
                                                okButtonProps={{ style: { display: 'none' } }}>
                                                <Follow userInfo={userInfo.userFollowing} userInfoAccMain={userProfileAcc} />
                                            </Modal>
                                        </li>
                                    </>
                                )}
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
            <Modal
                centered
                open={openPost}
                onOk={() => setOpenPost(false)}
                onCancel={() => setOpenPost(false)}
                footer={null}
                width={'unset'}
                style={{ maxHeight: 'calc(100vh - 40px)', maxWidth: 'calc(100% - 64px - 64px)' }}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                closeIcon={null}>
                <PostEach data={selectedItem!} userId={user?.uid as string} />
            </Modal>
        </Layouts >
    );
}
