import { AntDesignOutlined, AppstoreOutlined, FlagOutlined, HeartOutlined, LoadingOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, GetProp, Layout, message, Tabs, TabsProps, Upload, UploadProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import Layouts from '../../components/Layout/Layouts';
import './index.scss'
import Footers from '../../components/Footers/Footers';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { DocumentResponse, Post, ProfileResponse } from '../Types';
import { getPostByUserId } from '../../repository/post.service';
import { getUserProfile } from '../../repository/user.service';

export interface ProfileProps {
}

export default function Profile() {
    // props: ProfileProps

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const { user } = useUserAuth();
    const [data, setData] = useState<DocumentResponse[]>([]);
    const history = useNavigate();

    const initialUserProfile: ProfileResponse = {
        id: "",
        userId: user?.uid,
        displayName: user?.displayName ? user.displayName : "Guess...",
        photoURL: user?.photoURL ? user.photoURL : "",
        userBio: "input your bio...",
    }

    const [userInfo, setUserInfo] = useState<ProfileResponse>(initialUserProfile);

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

    useEffect(() => {
        if (user != null) {
            getAllPost(user.uid);
        }
    }, []);

    const renderPosts = () => {
        return data.map((item) => {
            return (
                <div key={item.photos[0].uuid} className='tablePhotoProfile'>
                    <img className='tableImgProfile' src={`${item.photos[0].cdnUrl}`} />
                </div>
            )
        })
    }

    const editProfile = () => {
        history("/setting", { state: userInfo });
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Posts',
            children: data ? <div className='tableContainerProfile'>{renderPosts()}</div> : <div>
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

    const getUserProfileInfo = async (userId: string) => {
        const data: ProfileResponse = (await getUserProfile(userId)) || {};
        if (data.displayName) {
            setUserInfo(data);
        }
    };

    useEffect(() => {
        if (user != null) {
            getAllPost(user.uid);
            getUserProfileInfo(user.uid);
        }
    }, []);

    console.log(userInfo);


    return (
        <Layouts>
            <Content className='profile__main'>
                <Layout className='profile__main__container'>
                    <Header className='profile__main__header'>
                        <div className='profile__main__header__avatar'>
                            <div className='profile__main__header__avaContainer'>

                                {userInfo.photoURL
                                    ? <img src={userInfo.photoURL} />
                                    : <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                        icon={<AntDesignOutlined />} />
                                }
                            </div>
                        </div>
                        <div className='profile__main__header__title'>
                            <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px' }}>
                                <div className='profile__fix'>
                                    <Link to='#'><strong>{userInfo.displayName}</strong></Link>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className='profile__fix profile_btn_fix'>
                                        <span onClick={editProfile}>Edit profile</span>
                                    </div>
                                    <div className='profile__more'>
                                        <SettingOutlined />
                                    </div>
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
                                <div>{userInfo.userBio}</div>
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <div>
                            <div>
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
                            </div>
                            <div>
                                <Tabs defaultActiveKey="1" items={items} centered />
                            </div>
                        </div>
                    </Content>
                </Layout>
                <Footer className='profile__footer__main'>
                    <Footers />
                </Footer>
            </Content>
        </Layouts>
    );
}
