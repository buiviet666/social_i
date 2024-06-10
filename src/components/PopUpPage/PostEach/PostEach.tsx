import { Avatar, Carousel, Divider, Dropdown, Input, MenuProps, Modal, Tooltip } from "antd";
import { DocumentResponse } from "../../../pages/Types";
import "./index.scss";
import { CommentOutlined, FlagOutlined, HeartOutlined, HeartTwoTone, MoreOutlined, SendOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import { uploadLikesOnPost, uploadSaveOnPost } from "../../../repository/post.service";
import { useNavigate } from "react-router-dom";
import Likes from "../Likes/Likes";
export interface PostEachProps {
    data: DocumentResponse;
    userId: string;
}

// interface DataType {
//     gender: string;
//     name: {
//         title: string;
//         first: string;
//         last: string;
//     };
//     email: string;
//     picture: {
//         large: string;
//         medium: string;
//         thumbnail: string;
//     };
//     nat: string;
// }

export default function PostEach({ data, userId }: PostEachProps) {

    const history = useNavigate();
    const [openLikes, setOpenLikes] = useState(false);
    const [likesInfo, setLikesInfo] = useState<{
        likes?: number,
        isLike?: boolean,
    }>({
        likes: data.likes,
        isLike: data.userlikes?.some(number => number === data.userId) ? true : false,
    });

    const uploadLike = async (isVal: boolean) => {
        setLikesInfo({
            likes: isVal ? likesInfo.likes! + 1 : likesInfo.likes! - 1,
            isLike: !likesInfo.isLike,
        });

        if (isVal) {
            data.userlikes?.push(data.userId as never);
        } else {
            data.userlikes?.splice(data.userlikes?.indexOf(data.userId as never), 1);
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
        isSave: data.usersave?.some(infoSave => infoSave === data.userId) ? true : false,
    });

    const uploadSave = async (isVal: boolean) => {
        setSaveInfo({
            isSave: !saveInfo.isSave,
        });

        if (isVal) {
            data.usersave?.push(data.userId as never);
        } else {
            data.usersave?.splice(data.usersave.indexOf(data.userId as never), 1);
        }

        await uploadSaveOnPost(
            data.id!,
            data.usersave!,
        )
    };

    const items: MenuProps['items'] = data.userId === userId ? (
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

    console.log("in ra post", data);

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
                    arrows
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
                    <div style={{ height: 500, overflow: 'auto', scrollbarWidth: 'none' }} className="p-4">
                        <div className="flex flex-row pr-4 pb-4">
                            <div>
                                {data.photoURL ? (
                                    <Avatar icon={<img src={data.photoURL} />} />
                                ) : (
                                    <Avatar icon={<UserOutlined />} />
                                )}
                            </div>
                            <div className="flex flex-row ml-4 self-center">
                                <a onClick={() => history("/profile", { state: { userId: data.userId } })}>
                                    <strong>{data.username} &nbsp;</strong>
                                </a>
                                <div>{data.caption}</div>
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
                                        <Likes data={data} />
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
        </div>
    );
}
