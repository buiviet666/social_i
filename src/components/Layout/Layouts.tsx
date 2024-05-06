import React, { useState } from 'react';
import { routes } from '../../Routes';
import { Link, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Drawer, Dropdown, Layout, Menu, MenuProps, Modal, Space } from 'antd';
import './index.scss';
import { LogoutOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { useUserAuth } from '../../context/UserAuthContext';
import { ProfileResponse } from '../../pages/Types';

interface LayoutsProps {
    children: React.ReactNode;
}

interface MenuItemType {
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
    const { user } = useUserAuth();

    const userInfo: ProfileResponse = {
        id: "",
        userId: user?.uid,
        displayName: user?.displayName ? user.displayName : "Name User...",
        userBio: "input your bio...",
    };

    const [create, setCreate] = useState<{ element: React.ReactElement | null; isOpen: boolean }>({
        element: null,
        isOpen: false,
    });

    const [drawer, setDrawer] = useState<{ element: React.ReactElement | null; isOpen: boolean }>({
        element: null,
        isOpen: false,
    });

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        onClick?: React.MouseEventHandler,
        children?: MenuItem[],
    ): MenuItem {
        return {
            label,
            key,
            icon,
            children,
            onClick,
        } as MenuItem;
    }

    const itemsMenu: MenuItem[] = (
        (routes[0]?.children ?? []).filter((item) => item.isMenuItem).map((itemsMenu: MenuItemType) => getItem(
            itemsMenu.label,
            itemsMenu.key,
            itemsMenu.icon,
            () => {
                if (itemsMenu.path) {
                    history(itemsMenu.path, { replace: true });
                } else if (itemsMenu.render) {
                    if (itemsMenu.popUp) {
                        setCreate({ element: itemsMenu.element || null, isOpen: true });
                        console.log(create);
                    } else if (create.isOpen === true || drawer.isOpen === true) {
                        setCreate({ element: null, isOpen: false });
                        setDrawer({ element: null, isOpen: false });
                    } else {
                        setDrawer({ element: itemsMenu.element || null, isOpen: true });
                    }
                }
            }
        ))
    );

    const items: MenuProps['items'] = [
        {
            label:
                <div onClick={() => history("/setting", { state: userInfo })}>
                    <SettingOutlined />
                    <span style={{ paddingLeft: '7px' }}>Setting</span>
                </div>,
            key: '10',
        },
        {
            type: 'divider',
        },
        {
            label:
                <Link to="/login" onClick={logOut}>
                    <LogoutOutlined />
                    <span style={{ paddingLeft: '7px' }}>Log out</span>
                </Link>,
            key: '12',
        },
    ];

    return (
        <>
            <Layout>
                <Sider
                    className='menu'
                    style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: '99999' }}>
                    <Link to="/" className="menu__logo">
                        <span>GreenLand</span>
                    </Link>

                    <Menu
                        mode='inline'
                        className='menuItems'
                        items={itemsMenu} />

                    <Dropdown
                        menu={{ items }}
                        placement="topLeft"
                        trigger={['click']}
                        overlayStyle={{ width: '200px', minWidth: 'unset' }}
                        arrow>
                        <Space className='menuMoreDisplay'>
                            <MenuOutlined />
                            <span>MORE</span>
                        </Space>
                    </Dropdown>
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
