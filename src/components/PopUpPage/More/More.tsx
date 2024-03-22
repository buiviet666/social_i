import React, { useMemo } from 'react';
import RoutesList from '../../../Routes';
import { Divider } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

export interface MoreProps {
}

export default function More(props: MoreProps) {

    const MoreItems = useMemo(() => {
        return RoutesList.filter((item) => item.moreItem).map((eachItem) => (
            <div>
                {eachItem.icon}
                {eachItem.label}
            </div>
        ));
    }, []);

    return (
        <div>
            {MoreItems}
            <Divider />
            <div>
                <LogoutOutlined />
                <span>logout</span>
            </div>
        </div>
    );
}
