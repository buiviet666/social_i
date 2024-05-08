import { Avatar, Layout, List } from 'antd';
import Layouts from '../../components/Layout/Layouts';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import RecommendFriend from '../../components/RecommendFriend/RecommendFriend';
import Post from '../../components/Post/Post';
import Rell from '../../components/Rell/Rell';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.scss';
import { useUserAuth } from '../../context/UserAuthContext';
import Footers from '../../components/Footers/Footers';
import { useEffect, useState } from 'react';
import { DocumentResponse } from '../Types';
import { getPosts } from '../../repository/post.service';

export default function Home() {
    // props: HomeProps
    const { user } = useUserAuth();
    const [data, setData] = useState<DocumentResponse[]>([]);
    const getAllPost = async () => {
        const response: DocumentResponse[] = await getPosts() || [];
        console.log("all post is: ", response);
        setData(response);
    };

    const renderPostCard = () => {
        return data.map((item) => {
            return <Post data={item} key={item.id} />
        })
    }

    useEffect(() => {
        if (user != null) {
            getAllPost();
        }
    }, [user]);

    return (
        <Layouts>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', width: 100, justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <Layout style={{ backgroundColor: 'rgb(255, 255, 255)', maxWidth: '630px', width: 100, display: 'block' }}>
                    <Header style={{ background: 'none', marginBottom: '23px', padding: '8px 0' }}>
                        <Rell />
                    </Header>
                    <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* <Post /> */}
                        {data ? renderPostCard() : <div>...nothing to show!!!</div>}
                    </Content>
                </Layout>

                <Sider className='recommendFriend__main'>
                    <List.Item.Meta
                        className='itemsProfile'
                        avatar={<Avatar icon={<AntDesignOutlined />} />}
                        title={<a href='#'><strong>{user?.displayName ? user.displayName : user?.email}</strong></a>}
                        description="nickname" />
                    <RecommendFriend />
                    <Footer style={{ background: 'none', color: '#C7C7C7' }}>
                        <Footers />
                    </Footer>
                </Sider>
            </Content>
        </Layouts>
    );
}
