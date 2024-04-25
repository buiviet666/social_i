import React, { useMemo, useState } from 'react';
import { routes } from '../../Routes';
import { Link, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Drawer, Dropdown, Layout, Menu, MenuProps, Modal } from 'antd';
import './index.scss';
import { LogoutOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { useUserAuth } from '../../context/UserAuthContext';

interface LayoutsProps {
    children: React.ReactNode;
}

interface MenuItem {
    path?: string;
    element?: React.ReactElement;
    label?: string;
    isMenuItem?: boolean;
    icon?: React.ReactElement;
    render?: boolean;
    popUp?: boolean;
    key?: string;
}

export default function Layouts({ children }: LayoutsProps) {

    const { logOut } = useUserAuth();
    const history = useNavigate();

    const [create, setCreate] = useState<{ element: React.ReactElement | null; isOpen: boolean }>({
        element: null,
        isOpen: false,
    });

    const [drawer, setDrawer] = useState<{ element: React.ReactElement | null; isOpen: boolean }>({
        element: null,
        isOpen: false,
    });

    const MenuItems = useMemo(() => {
        return routes[0].children?.filter((item) => item.isMenuItem).map((menuItem: MenuItem) => (
            <Menu.Item
                className='items'
                key={menuItem.key}
                icon={menuItem.icon}
                onClick={() => {
                    if (menuItem.path) {
                        history(menuItem.path, { replace: true });
                    } else if (menuItem.render) {
                        if (menuItem.popUp) {
                            setCreate({ element: menuItem.element || null, isOpen: true });
                        } else {
                            setDrawer({ element: menuItem.element || null, isOpen: true });
                        }
                    } else {
                        setCreate({ element: null, isOpen: false });
                        setDrawer({ element: null, isOpen: false });
                    }
                }}>
                <span>{menuItem.label}</span>
            </Menu.Item>
        ));
    }, [history]);

    const items: MenuProps['items'] = [
        {
            label: <Link to="/setting">
                <SettingOutlined />
                <span style={{ paddingLeft: '7px' }}>Setting</span>
            </Link>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <Link to="/login" onClick={logOut}>
                <LogoutOutlined />
                <span style={{ paddingLeft: '7px' }}>Log out</span>
            </Link>,
            key: '2',
        },
    ];

    return (
        <>
            <Layout>
                <Sider
                    className='menu'
                    style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: '99999' }}>
                    {/* Logo */}
                    <Link to="/" className="menu__logo">
                        <span>GreenLand</span>
                    </Link>

                    {/* Menu items */}
                    <Menu mode='inline' className='menuItems'>
                        {MenuItems}


                        {/* Menu more item */}
                        <Dropdown
                            className='menuItemsDropdown'
                            menu={{ items }}
                            trigger={['click']}
                            placement='top'
                            overlayStyle={{ width: '200px', minWidth: 'unset' }}>
                            <Menu.Item
                                onClick={(e) => e.domEvent.preventDefault()}
                                className='items positionBottom'
                                style={{ paddingLeft: '24px' }}
                                icon={<MenuOutlined />}>
                                <span>MORE</span>
                            </Menu.Item>
                        </Dropdown>
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 336, backgroundColor: 'rgb(255, 255, 255)' }}>
                    {children}
                </Layout>
            </Layout>
            <Drawer
                open={drawer.isOpen}
                onClose={() => { setDrawer({ element: null, isOpen: false }) }}
                closable={false}
                placement={"left"}
                maskClassName={'maskPopup'}
                style={{ marginLeft: '21rem' }}
                className='menuPopup'>
                {drawer.element}
            </Drawer>
            <Modal
                width={1040}
                style={{ paddingTop: '2px' }}
                closeIcon={null}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                open={create.isOpen}
                onCancel={() => { setCreate({ element: null, isOpen: false }) }}>
                {create.element}
            </Modal>
        </>
    );
}
