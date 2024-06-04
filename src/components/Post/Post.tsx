import { CommentOutlined, FlagOutlined, HeartOutlined, HeartTwoTone, MoreOutlined, SendOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Carousel, Divider, Dropdown, Input, MenuProps, Modal, Tooltip } from 'antd';
import './index.scss'
import { DocumentResponse } from '../../pages/Types';
import { useUserAuth } from '../../context/UserAuthContext';
import { useState } from 'react';
import { uploadLikesOnPost } from '../../repository/post.service';
import PostEach from '../PopUpPage/PostEach/PostEach';
import Likes from '../PopUpPage/Likes/Likes';
import Share from '../PopUpPage/Share/Share';
import { useNavigate } from 'react-router-dom';

interface PostProps {
    data: DocumentResponse;
}

export default function Post({ data }: PostProps) {

    const { user } = useUserAuth();
    const history = useNavigate();
    const [openCmt, setOpenCmt] = useState(false);
    const [openLikes, setOpenLikes] = useState(false);
    const [openShare, setOpenShare] = useState(false);
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

    const items: MenuProps['items'] = data.userId === user!.uid ? (
        [
            {
                label: <a href="https://www.antgroup.com">Edit</a>,
                key: '0',
            },
            {
                type: 'divider',
            },
            {
                label: <a href="https://www.aliyun.com">Delete</a>,
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: <a href="https://www.aliyun.com">Cancel</a>,
                key: '3',
            },
        ]
    ) : (
        [
            {
                label: <a href="https://www.antgroup.com">Unfollow</a>,
                key: '0',
            },
            {
                type: 'divider',
            },
            {
                label: <a href="https://www.aliyun.com">Save</a>,
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: <a href="https://www.aliyun.com">Cancel</a>,
                key: '3',
            },
        ]
    );


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
                        <a onClick={() => history("/profile", { state: { userId: data.userId, displayName: data.username, photoURL: data.photoURL } })}><strong>{data.username ? data.username : data.emailUser}</strong></a>
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
                                    width={1350}
                                    cancelButtonProps={{ style: { display: 'none' } }}
                                    okButtonProps={{ style: { display: 'none' } }}
                                    closeIcon={null}>
                                    <PostEach />
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
                                    <Share />
                                </Modal>
                            </>
                        </div>
                        <div className='post__main__description__container__save'><FlagOutlined /></div>
                    </div>
                    <div>
                        <strong onClick={() => setOpenLikes(true)} style={{ cursor: 'pointer' }}>{likesInfo.likes} Likes</strong>
                        <Modal
                            title="Likes"
                            centered
                            open={openLikes}
                            onOk={() => setOpenLikes(false)}
                            onCancel={() => setOpenLikes(false)}
                            width={1350}
                            cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}>
                            <Likes />
                        </Modal>
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex' }}>
                        <div style={{ marginRight: '4px' }}>
                            <strong>{data.username ? data.username : data.emailUser}</strong>
                        </div>
                        <div>
                            {data.caption}
                        </div>
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
        </div>
    );
}
