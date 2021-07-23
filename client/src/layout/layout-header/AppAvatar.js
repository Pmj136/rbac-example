import React from 'react'
import {Menu, Dropdown, Avatar} from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';

const menu = (
    <Menu>
        <Menu.Item key={1}>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item key={2}>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
);

function AppAvatar() {
    return (
        <Dropdown overlay={menu}>
           <span>
                <Avatar size={40} icon={<UserOutlined/>}/> <DownOutlined />
           </span>
        </Dropdown>
    )
}

export default AppAvatar