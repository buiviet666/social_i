import React, { useEffect, useMemo, useState } from 'react';
import RoutesList from '../../Routes';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Drawer, Layout, Menu, MenuProps, Popconfirm } from 'antd';
import './index.scss';
import Home from '../Home/Home';
import { Content, Footer } from 'antd/es/layout/layout';
import { MenuOutlined } from '@ant-design/icons';

export interface LayoutsProps {
}

export default function Layouts(props: LayoutsProps) {

    const history = useNavigate();
    const [visible, setVisible] = useState(false);
    const [popup, setPopup] = useState(null);


    useEffect(() => {
        if (popup !== null) {
            setVisible(false);
            setTimeout(() => setVisible(true), 50);
        }
    }, [popup])

    const openModal = (components: React.ReactNode) => {
        setPopup(components);
    }


    const MenuItems = useMemo(() => {
        return RoutesList.filter((item) => item.isMenuItem).map((menuItem) => (
            <Menu.Item
                onClick={() => menuItem.path ? history(menuItem.path, { replace: true }) : openModal(menuItem.render)}
                key={menuItem.label}
                icon={menuItem.icon}
            >
                <span>{menuItem.label}</span>
            </Menu.Item>
        ));
    }, [history]);

    const listRoutes = useMemo(() => {
        return RoutesList.filter((item) => item.auth).map((routeItems, idx) => {
            const ComponentRender = routeItems.component;
            return (
                <Route
                    key={idx}
                    path={routeItems.path}
                    element={<ComponentRender />}
                    exact
                    render
                ></Route>
            )
        })
    }, []);

    return (
        <div>
            <Layout hasSider>
                <Sider
                    className='menu'
                    style={{ backgroundColor: '#FFFFFF', overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
                >
                    {/* Logo */}
                    <div className="demo-logo-vertical">
                        halo
                    </div>

                    <Menu mode='inline'>
                        {MenuItems}
                        <Drawer
                            open={visible}
                            onClose={() => setVisible(false)}
                            placement={"left"}
                            maskClassName='hidden'
                            className='ml-72'
                        >
                            {popup}
                        </Drawer>
                    </Menu>
                    <Footer style={{ textAlign: 'center' }}>
                        <Popconfirm placement='top'
                            title
                            showCancel={false}
                            description={<h1>hhiii</h1>}
                            icon={false}
                            okButtonProps={{ style: { display: 'none' } }}>
                            <div className='menu__items__item menu__more__position'>
                                <div><MenuOutlined /></div>
                                <span>Xem thêm</span>
                            </div>
                        </Popconfirm>
                    </Footer>
                </Sider>

                <Layout>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div
                            style={{
                                padding: 24,
                                textAlign: 'center',
                            }}
                        >
                            <Routes >
                                {listRoutes}
                                <Route index element={<Home />}>
                                </Route>
                            </Routes>
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </div >
    );
}
