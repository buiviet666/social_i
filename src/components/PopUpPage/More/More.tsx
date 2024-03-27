import { useMemo } from 'react';
import { routes } from '../../../Routes';
import { Divider, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useUserAuth } from '../../../context/UserAuthContext';
import { Link } from 'react-router-dom';

export interface MoreProps {
}

export default function More() {

    const { logOut } = useUserAuth();

    const MoreItems = useMemo(() => {
        return routes[0].children?.filter((item) => item.moreItem).map((eachItem) => (
            <div>
                {eachItem.icon}
                {eachItem.label}
            </div>
        ));
    }, []);

    return (
        <Menu>
            {MoreItems}
            <Divider />
            <div>
                <Link to="/login" onClick={logOut}>
                    <LogoutOutlined />
                    <span style={{ paddingLeft: '7px' }}>
                        log out
                    </span>
                </Link>
            </div>
        </Menu>
    );
}
