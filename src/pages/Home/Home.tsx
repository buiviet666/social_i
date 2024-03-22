import { Col, Row } from 'antd';
import React from 'react';
import Rell from '../../components/Rell/Rell';
import Post from '../../components/Post/Post';
import RecommendFriend from '../../components/RecommendFriend/RecommendFriend';

export interface HomeProps {
}

export default function Home(HomeProps) {
    return (
        <Row>
            <Col span={16}>
                <Row>
                    <Col span={24} style={{ backgroundColor: 'yellow' }}>
                        <Rell />
                    </Col>
                    <Col span={24} style={{ backgroundColor: 'blue' }}>
                        <Post />
                    </Col>
                </Row>
            </Col>
            <Col span={8} style={{ backgroundColor: 'red' }}>
                <RecommendFriend />
            </Col>
        </Row>
    );
}
