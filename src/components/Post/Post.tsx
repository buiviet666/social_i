import { AntDesignOutlined, CommentOutlined, FlagOutlined, HeartOutlined, HeartTwoTone, MoreOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Divider, Input, Tooltip } from 'antd';
import './index.scss'
import { DocumentResponse } from '../../pages/Types';
import { useUserAuth } from '../../context/UserAuthContext';
import { useState } from 'react';
import { uploadLikesOnPost } from '../../repository/post.service';

interface PostProps {
    data: DocumentResponse;
}

export default function Post({ data }: PostProps) {

    const { user } = useUserAuth();
    const [likesInfo, setLikesInfo] = useState<{ likes?: number, isLike: boolean }>({
        likes: data.likes,
        isLike: data.userlikes.includes(user?.uid) ? true : false,
    });

    const uploadLike = async (isVal: boolean) => {
        setLikesInfo({
            likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
            isLike: !likesInfo.isLike,
        });

        if (isVal) {
            data.userlikes?.push(user!.uid);
        } else {
            data.userlikes?.splice(data.userlikes.indexOf(user!.uid), 1);
        }

        await uploadLikesOnPost(
            data.id!,
            data.userlikes!,
            isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
        );
    };



    return (
        <div className='post__container'>
            <div className='post__main'>
                <div className='post__main__spaceBetween'>
                    <div style={{ marginRight: '16px' }}><Avatar icon={<AntDesignOutlined />} /></div>
                    <div className='post__main__container'>
                        <div><strong>name</strong></div>
                        <span style={{ margin: '0 4px' }}>•</span>
                        <div style={{ color: 'rgb(115, 115, 115)' }}>time</div>
                    </div>
                    <div>
                        <div><MoreOutlined /></div>
                    </div>
                </div>
                <img className='post__main__img' width={272} alt='img' src={data.photos ? data.photos[0].cdnUrl : ""} />
                <div className='post__main__description'>
                    <div className='post__main__description__container'>
                        <div style={{ display: 'flex', position: 'absolute' }}>
                            <>
                                {likesInfo.isLike ? <HeartTwoTone twoToneColor="#da1540" className='iconPost' onClick={() => uploadLike(!likesInfo.isLike)} /> : <HeartOutlined className='iconPost' onClick={() => uploadLike(!likesInfo.isLike)} />}
                            </>
                            <CommentOutlined className='iconPost' />
                            <SendOutlined className='iconPost' />
                        </div>
                        <div className='post__main__description__container__save'><FlagOutlined /></div>
                    </div>
                    <div>
                        <strong>{likesInfo.likes} Likes</strong>
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex' }}>
                        <div style={{ marginRight: '4px' }}>
                            <strong>Name</strong>
                        </div>
                        <div>
                            {data.caption}
                        </div>
                    </div>
                    <div style={{ marginTop: '8px', color: 'rgba(0,0,0,.25)' }}>View comment...</div>
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
