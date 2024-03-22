import React, { useEffect, useMemo, useState } from 'react';
import RoutesList from '../../Routes';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Drawer, Layout, Menu, Popconfirm } from 'antd';
import './index.scss';
import Home from '../Home/Home';
import { Content, Footer } from 'antd/es/layout/layout';
import { MenuOutlined } from '@ant-design/icons';
import More from '../../components/PopUpPage/More/More';

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

        return () => {

        }
    }, [popup]);

    const openModal = (components: React.ReactNode) => {
        if (setPopup(components)) {
            setPopup(components);
        } else {
            setVisible(false);
        }
    }

    const MenuItems = useMemo(() => {
        return RoutesList.filter((item) => item.isMenuItem).map((menuItem) => (
            <Menu.Item
                className='menuItem'
                style={{ padding: '12px', margin: '4px 0', fontSize: '16px', fontWeight: 400 }}
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
                    style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
                >
                    {/* Logo */}
                    <div className="menu__logo">
                        <span>GreenLand</span>
                    </div>

                    {/* Menu items */}
                    <Menu mode='inline' className='menuItems'>
                        {MenuItems}
                        <Drawer
                            open={visible}
                            onClose={() => { setVisible(false) }}
                            closable={false}
                            placement={"left"}
                            maskClassName={'maskPopup'}
                            style={{ marginLeft: '21rem' }}
                            className='menuPopup'
                        >
                            {popup}
                        </Drawer>
                    </Menu>

                    {/* Menu more item */}
                    <Footer style={{ position: 'absolute', bottom: 0, width: '100%', cursor: 'pointer', display: 'flex', height: '10%', alignItems: 'center' }}>
                        <Popconfirm placement='top'
                            title
                            showCancel={false}
                            description={<More />}
                            icon={false}
                            okButtonProps={{ style: { display: 'none' } }}>
                            <div style={{ display: 'flex' }}>
                                <div><MenuOutlined /></div>
                                <span style={{ paddingLeft: 20 }}>Xem thêm</span>
                            </div>
                        </Popconfirm>
                    </Footer>
                </Sider>

                <Layout style={{ marginLeft: 336 }}>
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
