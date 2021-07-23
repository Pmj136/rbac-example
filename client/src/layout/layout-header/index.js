import React from 'react'
import {Layout} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import AppAvatar from "./AppAvatar";

const {Header} = Layout

function LayoutHeader(props) {

    return (
        <Header className="layout-header">
            <span style={{fontSize: '20px', cursor: 'pointer'}} onClick={props.onCollapsedChange}>
                {
                    props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>
                }
            </span>
            <div>
                <span>欢迎admin</span>
                <AppAvatar/>
            </div>
        </Header>
    )
}

export default LayoutHeader