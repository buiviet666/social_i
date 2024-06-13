import { Avatar, Layout, List } from 'antd';
import Layouts from '../../components/Layout/Layouts';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import RecommendFriend from '../../components/RecommendFriend/RecommendFriend';
import Post from '../../components/Post/Post';
// import Rell from '../../components/Rell/Rell';
import { UserOutlined } from '@ant-design/icons';
import './index.scss';
import { useUserAuth } from '../../context/UserAuthContext';
import Footers from '../../components/Footers/Footers';
import { useEffect, useState } from 'react';
import { DocumentResponse, ProfileResponse } from '../Types';
import { getPosts } from '../../repository/post.service';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, getUsers } from '../../repository/user.service';


export default function Home() {
    const { user } = useUserAuth();
    const history = useNavigate();
    const [userInfo, setUserInfo] = useState<ProfileResponse>({
        id: "",
        userId: user?.uid,
        displayName: user?.displayName,
        photoURL: "",
    })

    const [data, setData] = useState<DocumentResponse[]>([]);
    const [listUser, setListUser] = useState<ProfileResponse[]>([]);

    const getUserProfileAcc = async (userId: string) => {
        const getData: ProfileResponse = (await getUserProfile(userId)) || {};
        if (getData.displayName) {
            setUserInfo(getData);
        }
    };

    const getListUser = async () => {
        const getData: ProfileResponse[] = (await getUsers()) || [];
        setListUser(getData);
    }

    const getAllPost = async () => {
        const response: DocumentResponse[] = await getPosts() || [];
        console.log("in ra bai viet: ", response);

        setData(response);
    };


    const renderPostCard = () => {
        return data.map((item) => {
            return <Post data={item} key={item.id} />
        })
    }

    useEffect(() => {
        if (user != null) {
            getUserProfileAcc(user.uid);
            getAllPost();
            getListUser();
        }
    }, []);

    console.log("thong tin ca nhan: ", userInfo);
    console.log("danh sach ban be: ", listUser);




    return (
        <Layouts>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', width: 100, justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <Layout style={{ backgroundColor: 'rgb(255, 255, 255)', maxWidth: '630px', width: 100, display: 'block' }}>
                    <Header style={{ background: 'none', marginBottom: '23px', padding: '8px 0' }}>
                        {/* <Rell /> */}
                    </Header>
                    <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* <Post /> */}
                        {data ? renderPostCard() : <div>...nothing to show!!!</div>}
                    </Content>
                </Layout>

                <Sider className='recommendFriend__main'>
                    <List.Item.Meta
                        className='itemsProfile'
                        avatar={userInfo.photoURL ? (
                            <Avatar icon={<img src={userInfo.photoURL} />} />
                        ) : (
                            <Avatar icon={<UserOutlined />} />
                        )}
                        title={<a onClick={() => history("/profile", { state: { userId: userInfo.userId } })}><strong>{userInfo.displayName ? userInfo.displayName : user?.email}</strong></a>}
                        description={userInfo.displayName ? user?.email : ""} />
                    <RecommendFriend dataAcc={userInfo} />
                    <Footer style={{ background: 'none', color: '#C7C7C7' }}>
                        <Footers />
                    </Footer>
                </Sider>
            </Content>
        </Layouts>
    );
}
