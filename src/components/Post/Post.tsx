import { CommentOutlined, FlagOutlined, HeartOutlined, HeartTwoTone, MoreOutlined, SendOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Carousel, Divider, Dropdown, Input, MenuProps, Modal, Tooltip } from 'antd';
import './index.scss'
import { DocumentResponse, ProfileResponse } from '../../pages/Types';
import { useUserAuth } from '../../context/UserAuthContext';
import { useEffect, useState } from 'react';
import { deletePost, uploadLikesOnPost, uploadSaveOnPost } from '../../repository/post.service';
import PostEach from '../PopUpPage/PostEach/PostEach';
import Share from '../PopUpPage/Share/Share';
import { useNavigate } from 'react-router-dom';
import EditPost from '../PopUpPage/EditPost/EditPost';
import { getUserProfile, updateFollowingProfile, updateFollowProfile } from '../../repository/user.service';
import Follow from '../PopUpPage/Follow/Follow';

interface PostProps {
    data: DocumentResponse;
}

export default function Post({ data }: PostProps) {

    const { user } = useUserAuth();
    const history = useNavigate();

    const [openCmt, setOpenCmt] = useState(false);
    const [openLikes, setOpenLikes] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [userProfileAcc, setUserProfileAcc] = useState<ProfileResponse>();
    const [userProfileFriend, setUserProfileFriend] = useState<ProfileResponse>();

    const getUserProfileAcc = async (userId: string) => {
        const getData: ProfileResponse = (await getUserProfile(userId)) || {};
        if (getData.displayName) {
            setUserProfileAcc(getData);
        }
    }

    const getUserProfileFriend = async (userIdF: string) => {
        const getData: ProfileResponse = (await getUserProfile(userIdF)) || {};
        if (getData.displayName) {
            setUserProfileFriend(getData);
        }
    }

    const [likesInfo, setLikesInfo] = useState<{
        likes?: number,
        isLike?: boolean,
    }>({
        likes: data.likes,
        isLike: data.userlikes?.some(number => number === user?.uid) ? true : false,
    });

    const uploadLike = async (isVal: boolean) => {
        setLikesInfo({
            likes: isVal ? likesInfo.likes! + 1 : likesInfo.likes! - 1,
            isLike: !likesInfo.isLike,
        });

        if (isVal) {
            data.userlikes?.push(user?.uid as never);
        } else {
            data.userlikes?.splice(data.userlikes?.indexOf(user?.uid as never), 1);
        }

        await uploadLikesOnPost(
            data.id!,
            data.userlikes!,
            isVal ? likesInfo.likes! + 1 : likesInfo.likes! - 1,
        );
    };


    const [saveInfo, setSaveInfo] = useState<{
        isSave?: boolean,
    }>({
        isSave: data.usersave?.some(infoSave => infoSave === user?.uid) ? true : false,
    })

    const uploadSave = async (isVal: boolean) => {
        setSaveInfo({
            isSave: !saveInfo.isSave,
        });

        if (isVal) {
            data.usersave?.push(user?.uid as never);
        } else {
            data.usersave?.splice(data.usersave.indexOf(user?.uid as never), 1);
        }

        await uploadSaveOnPost(
            data.id!,
            data.usersave!,
        )
    };

    const uploadUnFollow = async () => {
        userProfileAcc?.userFollowing?.splice(userProfileAcc.userFollowing.indexOf(userProfileFriend?.userId as never), 1);
        userProfileFriend?.userFollowers?.splice(userProfileFriend?.userFollowers?.indexOf(userProfileAcc?.userId as never), 1);

        await updateFollowProfile(
            userProfileFriend!.id!,
            userProfileFriend!.userFollowers!,
        );

        await updateFollowingProfile(
            userProfileAcc!.id!,
            userProfileAcc!.userFollowing!,
        );
        window.location.reload();
    }

    const deletePostWithId = async (idPost: string) => {
        await deletePost(idPost);
        window.location.reload();
    }

    const items: MenuProps['items'] = data.userId === user!.uid ? (
        [
            {
                label: <a onClick={() => setOpenEdit(true)}>Edit</a>,
                key: '0',
            },
            {
                type: 'divider',
            },
            {
                label: <a onClick={() => deletePostWithId(data.id as never)}>Delete</a>,
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: <a >Cancel</a>,
                key: '3',
            },
        ]
    ) : (
        [
            {
                label: <a onClick={() => uploadUnFollow()}>Unfollow</a>,
                key: '0',
            },
            {
                type: 'divider',
            },
            {
                label:
                    <>
                        {saveInfo.isSave ? (
                            <a onClick={() => uploadSave(!saveInfo.isSave)}>unSave</a>
                        ) : (
                            <a onClick={() => uploadSave(!saveInfo.isSave)}>Save</a>
                        )}
                    </>,
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: <a >Cancel</a>,
                key: '3',
            },
        ]
    );

    useEffect(() => {
        if (user?.uid != null) {
            getUserProfileAcc(user?.uid as never);
            getUserProfileFriend(data.userId as never);
        }
    }, []);

    // console.log("inra da: ", data);

    // console.log("in ra: ", userProfileAcc);
    // console.log("inrabb: ", userProfileFriend);



    return (
        <div className='post__container'>
            <div className='post__main'>
                <div className='post__main__spaceBetween'>
                    <div style={{ marginRight: '16px' }}>
                        {data.photoURL ? (
                            <Avatar icon={<img src={data.photoURL} />} />
                        ) : (
                            <Avatar icon={<UserOutlined />} />
                        )}
                    </div>
                    <div className='post__main__container'>
                        <a onClick={() => history("/profile", { state: { userId: data.userId } })}><strong>{data.username ? data.username : data.emailUser}</strong></a>
                        <span style={{ margin: '0 4px' }}>•</span>
                        <div style={{ color: 'rgb(115, 115, 115)' }}>date</div>
                    </div>
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        arrow={{ pointAtCenter: true }}>
                        <div onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                            <MoreOutlined />
                        </div>
                    </Dropdown>
                </div>

                <Carousel
                    // arrows
                    infinite={false}>
                    {data.photos?.map((valueImg) => (
                        <div key={valueImg.uuid}>
                            <img className='post__main__img' width={272} alt='img' src={valueImg ? valueImg.cdnUrl : ""} />
                        </div>
                    ))}
                </Carousel>

                <div className='post__main__description'>
                    <div className='post__main__description__container'>
                        <div style={{ display: 'flex', position: 'absolute' }}>
                            <>
                                {likesInfo.isLike ? (
                                    <HeartTwoTone twoToneColor="#da1540" className='iconPost' onClick={() => uploadLike(!likesInfo.isLike)} />
                                ) : (
                                    <HeartOutlined className='iconPost' onClick={() => uploadLike(!likesInfo.isLike)} />
                                )}
                            </>
                            <>
                                <CommentOutlined className='iconPost' onClick={() => setOpenCmt(true)} />
                                <Modal
                                    centered
                                    open={openCmt}
                                    onOk={() => setOpenCmt(false)}
                                    onCancel={() => setOpenCmt(false)}
                                    footer={null}
                                    width={'inherit'}
                                    cancelButtonProps={{ style: { display: 'none' } }}
                                    okButtonProps={{ style: { display: 'none' } }}
                                    closeIcon={null}>
                                    <PostEach data={data} userId={user?.uid as string} userProfileAcc={userProfileAcc} userProfileFriend={userProfileFriend} />
                                </Modal>
                            </>
                            <>
                                <SendOutlined className='iconPost' onClick={() => setOpenShare(true)} />
                                <Modal
                                    centered
                                    open={openShare}
                                    onOk={() => setOpenShare(false)}
                                    onCancel={() => setOpenShare(false)}
                                    width={1350}
                                    cancelButtonProps={{ style: { display: 'none' } }}
                                    okButtonProps={{ style: { display: 'none' } }}
                                    closeIcon={null}>
                                    <Share data={data} />
                                </Modal>
                            </>
                        </div>
                        <div className='post__main__description__container__save'>
                            <>
                                {saveInfo.isSave ? (
                                    <FlagOutlined style={{ color: 'goldenrod' }} className='iconPost' onClick={() => uploadSave(!saveInfo.isSave)} />
                                ) : (
                                    <FlagOutlined className='iconPost' onClick={() => uploadSave(!saveInfo.isSave)} />
                                )}
                            </>
                        </div>
                    </div>
                    <div>
                        <strong onClick={() => setOpenLikes(true)} style={{ cursor: 'pointer' }}>{likesInfo.likes} Likes</strong>
                        <Modal
                            title="Likes"
                            centered
                            open={openLikes}
                            footer={null}
                            onOk={() => setOpenLikes(false)}
                            onCancel={() => setOpenLikes(false)}
                            cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}>
                            <Follow userInfo={data.userlikes} userInfoAccMain={userProfileAcc} />
                        </Modal>
                    </div>
                    <div style={{ marginTop: '8px', wordBreak: 'break-all', lineHeight: 1.3 }}>
                        <a onClick={() => history("/profile", { state: { userId: data.userId } })} className='mr-1'>
                            <strong>{data.username ? data.username : data.emailUser}</strong>
                        </a>
                        <span>{data.caption}</span>
                    </div>
                    <div style={{ marginTop: '8px', color: 'rgba(0,0,0,.25)', cursor: 'pointer' }} onClick={() => setOpenCmt(true)}>View comment...</div>
                    <div style={{ marginTop: '8px' }}>
                        <Input
                            placeholder="Input your comment !"
                            suffix={<Tooltip title="Extra information">
                                <SmileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                            </Tooltip>} />
                    </div>
                </div>
            </div>
            <Divider />
            <Modal
                centered
                open={openEdit}
                onOk={() => setOpenEdit(false)}
                onCancel={() => setOpenEdit(false)}
                footer={null}
                width={'60%'}
                style={{ maxHeight: 'calc(100vh - 40px)', maxWidth: 'calc(100% - 64px - 64px)' }}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                closeIcon={null}>
                <EditPost datapost={data} />
            </Modal>
        </div>
    );
}
