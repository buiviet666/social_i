import { Avatar, Carousel, Divider, Dropdown, Input, MenuProps, Modal, Tooltip } from "antd";
import { DocumentResponse, ProfileResponse } from "../../../pages/Types";
import "./index.scss";
import { CommentOutlined, FlagOutlined, HeartOutlined, HeartTwoTone, MoreOutlined, SendOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import { deletePost, uploadLikesOnPost, uploadSaveOnPost } from "../../../repository/post.service";
import { useNavigate } from "react-router-dom";
import Follow from "../Follow/Follow";
import EditPost from "../EditPost/EditPost";
import { updateFollowingProfile, updateFollowProfile } from "../../../repository/user.service";

export interface PostEachProps {
    data: DocumentResponse;
    userId: string;
    userProfileAcc?: ProfileResponse;
    userProfileFriend?: ProfileResponse;
}


export default function PostEach({ data, userId, userProfileAcc, userProfileFriend }: PostEachProps) {

    const history = useNavigate();
    const [openLikes, setOpenLikes] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [likesInfo, setLikesInfo] = useState<{
        likes?: number,
        isLike?: boolean,
    }>({
        likes: data.likes,
        isLike: data.userlikes?.some(number => number === userId) ? true : false,
    });

    const uploadLike = async (isVal: boolean) => {
        setLikesInfo({
            likes: isVal ? likesInfo.likes! + 1 : likesInfo.likes! - 1,
            isLike: !likesInfo.isLike,
        });

        if (isVal) {
            data.userlikes?.push(userId as never);
        } else {
            data.userlikes?.splice(data.userlikes?.indexOf(userId as never), 1);
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
        isSave: data.usersave?.some(infoSave => infoSave === userId) ? true : false,
    });

    const uploadSave = async (isVal: boolean) => {
        setSaveInfo({
            isSave: !saveInfo.isSave,
        });

        if (isVal) {
            data.usersave?.push(userId as never);
        } else {
            data.usersave?.splice(data.usersave.indexOf(userId as never), 1);
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

    const items: MenuProps['items'] = data.userId === userId ? (
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

    console.log("in ra post", data);
    console.log("in ra id: ", userProfileAcc);
    console.log("in ra bb:", userProfileFriend);



    // const [loading, setLoading] = useState(false);
    // const [datatest, setData] = useState<DataType[]>([]);

    // const loadMoreData = () => {
    //     if (loading) {
    //         return;
    //     }
    //     setLoading(true);
    //     fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //         .then((res) => res.json())
    //         .then((body) => {
    //             setData([...datatest, ...body.results]);
    //             setLoading(false);
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         });
    // };

    // useEffect(() => {
    //     loadMoreData();
    // }, []);

    return (
        <div className="postEach__main">
            <div className="postEach__main__img">
                <Carousel
                    // arrows
                    infinite={false}>
                    {data.photos?.map((items) => (
                        <div key={items.uuid}>
                            <img className="postEach__main__img__size" alt='img' src={items.cdnUrl} />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="postEach__main__content">
                <div className="postEach__main__content__title items-center">
                    <div className="flex py-3.5 pl-4 pr-1 w-full">
                        <div>
                            {data.photoURL ? (
                                <Avatar icon={<img src={data.photoURL} />} />
                            ) : (
                                <Avatar icon={<UserOutlined />} />
                            )}
                        </div>
                        <div className="ml-3.5 self-center">
                            <a onClick={() => history("/profile", { state: { userId: data.userId } })}>
                                <strong>{data.username}</strong>
                            </a>
                        </div>
                    </div>

                    <div className="pr-2">
                        <Dropdown
                            menu={{ items }}
                            trigger={['click']}
                            arrow={{ pointAtCenter: true }}>
                            <div onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                                <MoreOutlined />
                            </div>
                        </Dropdown>
                    </div>
                </div>
                <Divider className="m-0" />
                <div className="flex flex-col">
                    <div style={{ height: 400, overflow: 'auto', scrollbarWidth: 'none' }} className="p-4">
                        <div className="flex flex-row pr-4 pb-4">
                            <div>
                                {data.photoURL ? (
                                    <Avatar icon={<img src={data.photoURL} />} />
                                ) : (
                                    <Avatar icon={<UserOutlined />} />
                                )}
                            </div>
                            <div className="ml-3.5 self-center" style={{ wordBreak: 'break-all' }}>
                                <a className="mr-1" onClick={() => history("/profile", { state: { userId: data.userId } })}>
                                    <strong>{data.username}</strong>
                                </a>
                                {data.caption}
                            </div>
                        </div>
                        {/* <InfiniteScroll
                            dataLength={datatest.length}
                            next={loadMoreData}
                            hasMore={datatest.length < 50}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                dataSource={datatest}
                                renderItem={(item) => (
                                    <List.Item key={item.email}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.picture.large} />}
                                            title={<a ><strong>{item.name.last}</strong></a>}
                                            description={item.email}
                                        />
                                        <div>
                                            <HeartOutlined />
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll> */}
                    </div>
                    <Divider className="m-0" />
                    <div className="flex flex-col">
                        <div className="postEach__main__content__interact">
                            <div className="flex justify-between pt-1.5 pb-2 px-4">
                                <div>
                                    <>
                                        {likesInfo.isLike ? (
                                            <HeartTwoTone twoToneColor="#da1540" className="postEach__main__content__interact__icon" onClick={() => uploadLike(!likesInfo.isLike)} />
                                        ) : (
                                            <HeartOutlined className="postEach__main__content__interact__icon" onClick={() => uploadLike(!likesInfo.isLike)} />
                                        )}
                                    </>
                                    <CommentOutlined className="postEach__main__content__interact__icon" />
                                    <SendOutlined className="postEach__main__content__interact__icon" />
                                </div>
                                <div>
                                    <>
                                        {saveInfo.isSave ? (
                                            <FlagOutlined style={{ color: 'goldenrod' }} className="postEach__main__content__interact__icon" onClick={() => uploadSave(!saveInfo.isSave)} />
                                        ) : (
                                            <FlagOutlined className="postEach__main__content__interact__icon" onClick={() => uploadSave(!saveInfo.isSave)} />
                                        )}
                                    </>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="px-4 mb-1">
                                    <a onClick={() => setOpenLikes(true)} style={{ cursor: 'pointer' }}>
                                        <strong>{likesInfo.likes} Likes</strong>
                                    </a>
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
                                </span>
                                <span className="px-4 mb-4">date</span>
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <div>
                                <Input
                                    placeholder="Input your comment !"
                                    suffix={<Tooltip title="Extra information">
                                        <SmileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                                    </Tooltip>} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                centered
                open={openEdit}
                onOk={() => setOpenEdit(false)}
                onCancel={() => setOpenEdit(false)}
                footer={null}
                width={'unset'}
                style={{ maxHeight: 'calc(100vh - 40px)', maxWidth: 'calc(100% - 64px - 64px)' }}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                closeIcon={null}>
                <EditPost datapost={data} />
            </Modal>
        </div>
    );
}
