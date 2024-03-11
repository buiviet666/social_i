import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Routes from '../../Routes';
import { MenuOutlined } from '@ant-design/icons';

export interface MenuProps {
}

export default function Menu(props: MenuProps) {

    const history = useNavigate();

    const MenuItems = useMemo(() => {
        return Routes.filter((item) => item.isMenuItem).map((menuItem) => (
            <div>
                <div>
                    <span>
                        <div onClick={() => menuItem.path && history(menuItem.path)} key={menuItem.path}>
                            <div>
                                {menuItem.icon}
                            </div>
                            <span>
                                {menuItem.label}
                            </span>
                        </div>
                    </span>
                </div>
            </div>
        ));
    }, [history]);

    return (
        <div className=''>
            <div>
                <div>
                    <div>
                        <a>Logo page</a>
                    </div>
                </div>
                <div>
                    {MenuItems}
                </div>
                <div>
                    <span>
                        <div>
                            <div>
                                <MenuOutlined />
                            </div>
                            <span>
                                Xem thêm
                            </span>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}
